import type { FastifyPluginAsync, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import { hash } from '@node-rs/argon2'
import {
  type SignupBody,
  signupBodySchema
} from '@reeba/common'

import { argon2Options, NANOID_USER_ID_LENGTH } from '../../constants/index.js'

const schema: FastifySchema = {
  description: 'Signup for new user',
  body: signupBodySchema
}

const plugin: FastifyPluginAsync = async (instance, _) => {
  instance.post<{ Body: SignupBody }>(
    '/auth/signup',
    { schema },
    async (request, _) => {
      const encryptedPassword = await hash(request.body.password, argon2Options)

      await instance.pg.query<[string, string, string, string]>(
        'insert into "users" (user_id, user_username, user_email, user_password) values ($1, $2, $3, $4)',
        [nanoid(NANOID_USER_ID_LENGTH), request.body.username, request.body.email, encryptedPassword]
      )

      return {
        statusCode: '200',
        message: 'successfully signed up.'
      }
    }
  )
}

export default plugin
