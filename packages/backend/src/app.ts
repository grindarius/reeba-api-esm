import { type FastifyInstance, type FastifyServerOptions, fastify } from 'fastify'

import routes from './routes/index.js'

/**
  * Creates fastify instance to start the server
  *
  * @param options Fastify's server options
  * @returns fastify's server instance as a promise
  */
const build = async (options?: FastifyServerOptions): Promise<FastifyInstance> => {
  if (options == null) {
    options = {
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard'
          }
        }
      }
    }
  }

  const app = fastify(options)

  await app.register(routes)

  return await app
}

export default build
