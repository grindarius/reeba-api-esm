declare module fastify {
  interface Session {
    sessionId: string
    username: string
  }
}
