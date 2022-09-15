import type { FastifyPluginAsync } from 'fastify'

import type { FastifyJWTOptions } from '@fastify/jwt'

import '@fastify/jwt'
import 'fastify'

const plugin: FastifyPluginAsync<FastifyJWTOptions>
export default plugin

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      userId: string
      username: string
    }

    user: {
      userId: string
      username: string
    }
  }
}
