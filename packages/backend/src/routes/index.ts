import type { FastifyPluginAsync, FastifySchema } from 'fastify'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

import {
  type GetContributionInformationReply,
  getContributionInformationReplySchema
} from '@reeba/common'

import authen from './authen/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const schema: FastifySchema = {
  description: 'get API contribution information',
  response: {
    '2xx': getContributionInformationReplySchema
  }
}

const route: FastifyPluginAsync = async (instance, _) => {
  await instance.register(authen)

  instance.get<{ Reply: GetContributionInformationReply }>('/', { schema }, () => {
    return {
      author: 'Bhatarapong Somwong',
      email: 'numbbutt34685@gmail.com'
    }
  })

  instance.get(
    '/favicon.ico',
    (_, reply) => {
      return reply.sendFile('favicon.ico', resolve(__dirname, '..', '..', 'assets'))
    }
  )
}

export default route
