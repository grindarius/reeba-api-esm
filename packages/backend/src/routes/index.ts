import type {
  FastifyPluginAsync
} from 'fastify'

const route: FastifyPluginAsync = async (instance, _) => {
  instance.all(
    '/',
    () => {
      return {
        author: 'Bhatarapong Somwong',
        contributionEmail: 'numbbutt34685@gmail.com'
      }
    }
  )
}

export default route
