import dotenv from 'dotenv-flow'
import { type FastifyInstance, type FastifyServerOptions, fastify } from 'fastify'
import { nanoid } from 'nanoid'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import multipart from '@fastify/multipart'
import postgres from '@fastify/postgres'
import session from '@fastify/session'
import servestatic from '@fastify/static'
import swagger from '@fastify/swagger'

import routes from './routes/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: resolve(__dirname, '..')
})

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

  // * not checking password since some local database does not need password to authenticate
  const pgUsername = process.env['REEBA_POSTGRES_USERNAME']
  const pgPassword = process.env['REEBA_POSTGRES_PASSWORD'] ?? ''
  const pgHost = process.env['REEBA_POSTGRES_HOST']
  const pgPort = process.env['REEBA_POSTGRES_PORT']
  const pgDatabaseName = process.env['REEBA_POSTGRES_DATABASE_NAME']

  if (
    pgUsername == null || pgUsername === '' ||
    pgHost == null || pgUsername === '' ||
    pgPort == null || pgPort === '' ||
    pgDatabaseName == null || pgDatabaseName === ''
  ) {
    throw new Error('missing postgres credentials')
  }

  const cookieSecret = process.env['REEBA_COOKIE_SECRET']

  if (cookieSecret == null || cookieSecret === '') {
    throw new Error('missing cookie secret')
  }

  const argon2Secret = process.env['REEBA_ARGON2_SECRET']

  if (argon2Secret == null || argon2Secret === '') {
    throw new Error('missing argon2 secret')
  }

  const app = fastify(options)

  await app.register(cors)
  await app.register(cookie)
  await app.register(session, {
    secret: cookieSecret,
    cookie: {
      // * 6 hours session
      maxAge: 1000 * 60 * 60 * 6,
      secure: false,
      httpOnly: true
    },
    idGenerator: () => {
      return nanoid(25)
    }
  })
  await app.register(helmet)
  await app.register(multipart)
  await app.register(servestatic, {
    root: resolve(__dirname, '..', 'uploads'),
    prefix: '/uploads/'
  })
  await app.register(postgres, {
    connectionString: `postgres://${pgUsername}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabaseName}`
  })
  await app.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'ReebA\'s API Documentation',
        description: 'ReebA\'s API Documentation',
        version: '1.0.0'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: [
        'application/json',
        'multipart/form-data'
      ],
      produces: [
        'application/json',
        'image/*'
      ]
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    exposeRoute: true
  })
  await app.register(routes)

  await app.ready()
  app.swagger()

  return await app
}

export default build
