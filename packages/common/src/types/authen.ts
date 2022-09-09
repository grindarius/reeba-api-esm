import { type Static, Type } from '@sinclair/typebox'

export const signupBodySchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String()
})
export type SignupBody = Static<typeof signupBodySchema>

export const signinBodySchema = Type.Object({
  usernameOrEmail: Type.String(),
  password: Type.String()
})
export type SigninBodySchema = Static<typeof signinBodySchema>
