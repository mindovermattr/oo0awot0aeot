import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('amo_token')
export class AmoTokenEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', unique: true })
  referer!: string;

  @Column({ type: 'varchar', name: 'access_token' })
  accessToken!: string;

  @Column({ type: 'varchar', name: 'refresh_token' })
  refreshToken!: string;

  @Column({ type: 'varchar', name: 'token_type', default: 'Bearer' })
  tokenType!: string;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt!: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}
