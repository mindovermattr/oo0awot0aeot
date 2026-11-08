import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3000/api-json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/endpoints',
      schemas: 'src/api/generated/model',
      client: 'vue-query',
      httpClient: 'axios',
      mock: false,
      clean: true,
      override: {
        mutator: {
          path: './src/services/instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
  },
})
