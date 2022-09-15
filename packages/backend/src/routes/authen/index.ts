import type { FastifyPluginAsync } from 'fastify'

import redundanciesCheck from './redundancies-check/index.js'
import signin from './signin.js'
import signup from './signup.js'

const route: FastifyPluginAsync = async (instance, _) => {
  await instance.register(signin)
  await instance.register(signup)
  await instance.register(redundanciesCheck)
}

export default route
