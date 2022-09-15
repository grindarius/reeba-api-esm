import type { FastifyPluginAsync, FastifySchema } from 'fastify'

import { verify } from '@node-rs/argon2'
import {
  type SigninBody,
  type users,
  signinBodySchema
} from '@reeba/common'

import { argon2Options } from '../../constants/index.js'

const schema: FastifySchema = {
  description: 'sign a user into the website and keeps the user\'s session',
  body: signinBodySchema
}

const route: FastifyPluginAsync = async (instance, _) => {
  instance.post<{ Body: SigninBody }>(
    '/auth/signin',
    { schema },
    async (request, reply) => {
      const { usernameOrEmail, password } = request.body

      const userFromGivenCredential = await instance.pg.query<users, [string]>(
        'select * from "users" where user_username = $1 or user_email = $1',
        [usernameOrEmail]
      )

      if (userFromGivenCredential.rows.length === 0) {
        void reply.code(404)
        throw new Error('user not found')
      }

      const user = userFromGivenCredential.rows[0]

      if (user == null) {
        void reply.code(404)
        throw new Error('user not found')
      }

      const passwordFromDatabase = user.user_password
      const isPasswordSame = await verify(passwordFromDatabase, password, argon2Options)

      if (!isPasswordSame) {
        void reply.code(401)
        throw new Error('password is incorrect')
      }

      return {
        who: 'dis'
      }
    }
  )
}

export default route
