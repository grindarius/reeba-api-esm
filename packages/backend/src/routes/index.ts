import type { FastifyPluginAsync } from 'fastify'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

import {
  getContributionInformationReplySchema,
  type GetContributionInformationReply
} from '@reeba/common'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const schema: FastifySchema = {
  description: 'get API contribution information',
  reply: getContributionInformationReplySchema
}

const route: FastifyPluginAsync = async (instance, _) => {
  instance.all<{ Reply: GetContributionInformationReply }>(
    '/',
    {
      schema
    },
    () => {
      return {
        author: 'Bhatarapong Somwong',
        email: 'numbbutt34685@gmail.com'
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
