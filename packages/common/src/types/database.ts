/**
 * Table that stores information about a user.
 */
export interface users {
  /**
   * Auto generated user id using nanoid(32).
   */
  user_id: string
  /**
   * Username of the user, 3-20 characters long, only \w regex match, unique.
   */
  user_username: string
  /**
   * User's email, one user for one email only, unique.
   */
  user_email: string
  /**
   * User's password, secured using argon2.
   */
  user_password: string
}

/**
 * Table that stores session of a user.
 */
export interface user_sessions {
  /**
   * Unique ID of a session, generated using nanoid(32).
   */
  user_session_id: string
  /**
   * ID of the user that's logged in.
   */
  user_id: string
  /**
   * When does the session created, formatted in ISO String.
   */
  user_session_start_time: string
}
