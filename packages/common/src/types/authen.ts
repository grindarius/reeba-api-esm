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
export type SigninBody = Static<typeof signinBodySchema>

export const checkUsernameRedundanciesParamsSchema = Type.Object({
  username: Type.String()
})
export type CheckUsernameRedundanciesParams = Static<typeof checkUsernameRedundanciesParamsSchema>

export const checkUsernameRedundanciesReplySchema = Type.Boolean()
export type CheckUsernameRedundanciesReply = Static<typeof checkUsernameRedundanciesReplySchema>

export const checkEmailRedundanciesParamsSchema = Type.Object({
  email: Type.String()
})
export type CheckEmailRedundanciesParams = Static<typeof checkEmailRedundanciesParamsSchema>

export const checkEmailRedundanciesReplySchema = Type.Boolean()
export type CheckEmailRedundanciesReply = Static<typeof checkEmailRedundanciesReplySchema>
