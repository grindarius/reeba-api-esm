import dayjs from 'dayjs'
import type * as Fastify from 'fastify'
import type { Pool } from 'pg'

import type FastifySessionPlugin from '@fastify/session'

export const initializeStore = (pool: Pool): FastifySessionPlugin.SessionStore => {
  return {
    get: (sessionId, callback) => {
      pool.connect((error, client, done) => {
        if (error != null) {
          done()
          callback(null)
        }

        client.query<{
          user_session_id: string
          user_session_data: Fastify.Session
          user_session_end_datetime: string
        }>(
          'select * from "user_sessions" where user_session_id = $1',
          [sessionId],
          (error, result) => {
            if (error != null) {
              done()
              callback(null)
            }

            if (result.rows.length === 0) {
              done()
              callback(new Error('session not found'))
            }

            // ts-ignore
            callback(null, result.rows[0]?.user_session_data)
            done()
          }
        )
      })
    },
    set: (sessionId, session, callback) => {
      pool.connect((error, client, done) => {
        if (error != null) {
          done()
          callback(error)
        }

        client.query(
          'update "user_sessions" set user_session_data = $1, user_session_end_datetime = $2 where user_session_id = $3',
          [session, dayjs(), sessionId],
          (error) => {
            if (error != null) {
              done()
              callback(error)
            }

            done()
            callback()
          }
        )
      })
    },
    destroy: (sessionId, callback) => {
      pool.connect((error, client, done) => {
        if (error != null) {
          done()
          callback(error)
        }

        client.query(
          'delete * from "user_sessions" where user_session_id = $1',
          [sessionId],
          (error) => {
            if (error != null) {
              done()
              callback(error)
            }

            done()
            callback()
          }
        )
      })
    }
  }
}

export class ReebaSession implements FastifySessionPlugin.SessionStore {
  private readonly pool: Pool | undefined = undefined

  constructor (pool: Pool) {
    this.pool = pool
  }

  public get (sessionId, callback): void {
    if (this.pool == null) {
      throw new Error('session pool is not initialized')
    }

    this.pool.connect((error, client, done) => {
      if (error != null) {
        throw error
      }
    })
  }

  public set (sessionId, session, callback): void {}

  public destroy (sessionId, callback): void {}
}
