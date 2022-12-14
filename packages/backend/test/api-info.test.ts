import t from 'tap'

import build from '../src/app.js'

await t.test('getting api informations', async t => {
  const app = await build()

  t.teardown(async () => {
    await app.close()
  })

  await t.test('get api info for contribution', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/'
      })

      t.strictSame(response.json(), {
        author: 'Bhattarapong Somwong',
        email: 'numbbutt34685@gmail.com'
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
