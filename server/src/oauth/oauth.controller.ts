import { BadRequestException, Controller, Get, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';
import { OAuthQueryDto } from './dto/oauth-query.dto.js';
import { OauthService } from './oauth.service.js';

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('authorize')
  @ApiOperation({
    summary: 'Редирект на страницу авторизации amoCRM',
    description:
      'Возвращает 302 с Location на www.amocrm.ru/oauth. Открывать в браузере, а не через fetch/XHR.',
  })
  @ApiFoundResponse({
    description: 'Редирект на OAuth-страницу amoCRM',
    headers: {
      Location: {
        description: 'URL авторизации amoCRM',
        schema: {
          type: 'string',
          example: 'https://www.amocrm.ru/oauth?client_id=xxx&state=yyy&mode=popup',
        },
      },
    },
  })
  authorize(@Res() reply: FastifyReply) {
    const data = this.oauthService.authorize();
    const url = `https://www.amocrm.ru/oauth?client_id=${data.clientId}&state=${data.state}&mode=post_message`;

    return reply.redirect(url);
  }

  @Get('callback')
  @ApiOperation({
    summary: 'Callback OAuth amoCRM',
    description:
      'amoCRM редиректит сюда с ?code=... после согласия пользователя. ' +
      'Обменивает code на access/refresh token и сохраняет в БД.',
  })
  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    example: 'def50200a1b2c3...',
    description: 'Код авторизации от amoCRM',
  })
  @ApiBadRequestResponse({ description: 'Параметр code не передан' })
  callback(@Query() query: OAuthQueryDto) {
    const { code } = query;

    if (!code) throw new BadRequestException('code is required');

    return this.oauthService.exchangeCode(code);
  }
}
