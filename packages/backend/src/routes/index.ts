import type { FastifyPluginAsync } from 'fastify'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const route: FastifyPluginAsync = async (instance, _) => {
  instance.all(
    '/',
    {
      schema: {
        description: 'get api contribution information'
      }
    },
    () => {
      return {
        author: 'Bhatarapong Somwong',
        contributionEmail: 'numbbutt34685@gmail.com'
      }
    }
  )

  instance.get(
    '/favicon.ico',
    (_, reply) => {
      return reply.sendFile('favicon.ico', resolve(__dirname, '..', '..', 'assets'))
    }
  )
}

export default route
