import type { FastifyPluginAsync } from 'fastify'

import {
  type CheckEmailRedundanciesParams,
  type CheckEmailRedundanciesReply,
  type CheckUsernameRedundanciesParams,
  type CheckUsernameRedundanciesReply,
  checkEmailRedundanciesParamsSchema,
  checkEmailRedundanciesReplySchema,
  checkUsernameRedundanciesParamsSchema,
  checkUsernameRedundanciesReplySchema,
  users
} from '@reeba/common'

const route: FastifyPluginAsync = async (instance, _) => {
  instance.get<{ Params: CheckUsernameRedundanciesParams, Reply: CheckUsernameRedundanciesReply }>(
    '/auth/signup/redundancies-check/username/:username',
    {
      schema: {
        description: 'Checks whether a given username is valid and can be used',
        params: checkUsernameRedundanciesParamsSchema,
        response: {
          '2xx': checkUsernameRedundanciesReplySchema
        }
      }
    },
    async (request, reply) => {
      const { username } = request.params

      const results = await instance.pg.query<{ user_username: string }, [string]>(
        'select user_username from "users" where user_username = $1',
        [username]
      )

      if (results.rows.length !== 0) {
        void reply.code(400)
        throw new Error('this username is taken')
      }

      return true
    }
  )

  instance.get<{ Params: CheckEmailRedundanciesParams, Reply: CheckEmailRedundanciesReply }>(
    '/auth/signup/redundancies-check/email/:email',
    {
      schema: {
        description: 'Checks whether a given email is valid and can be used',
        params: checkEmailRedundanciesParamsSchema,
        response: {
          '2xx': checkEmailRedundanciesReplySchema
        }
      }
    },
    async (request, reply) => {
      const { email } = request.params

      const results = await instance.pg.query<Pick<users, 'user_email'>, [string]>(
        'select user_email from "users" where user_email = $1',
        [email]
      )

      if (results.rows.length !== 0) {
        void reply.code(400)
        throw new Error('this email is taken')
      }

      return true
    }
  )
}

export default route
