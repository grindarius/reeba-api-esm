import { Static, Type } from '@sinclair/typebox'

export const getContributionInformationReplySchema = Type.Object({
  author: Type.String(),
  email: Type.String()
})
export type GetContributionInformationReply = Static<typeof getContributionInformationReplySchema>

export * from './authen.js'
export * from './database.js'
