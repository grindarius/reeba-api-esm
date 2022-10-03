import { Algorithm, Options as Argon2Options, Version } from '@node-rs/argon2'

/**
 * The length of user_id in users table
 */
export const NANOID_USER_ID_LENGTH = 32

export const argon2Options: Argon2Options = {
  algorithm: Algorithm.Argon2id,
  version: Version.V0x13,
  timeCost: 12,
  outputLen: 128,
  parallelism: 4
}
