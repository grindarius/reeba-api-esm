import { exit } from 'node:process'

import build from './app.js'

const server = await build()

server.listen({ port: 3000 }, (error, _) => {
  if (error != null) {
    server.log.error(error)
    exit(1)
  }
})
