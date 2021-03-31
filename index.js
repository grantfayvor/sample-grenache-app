'use strict'

const {
  grapes: createGrapes,
  worker: createWorker,
  client: createClient
} = require('bfx-svc-test-helper')

async function start () {
  console.log('Wait till ready')

  const grapes = createGrapes()

  console.log('created grapes')

  await grapes.start()

  console.log('started grapes')

  const serviceRoot = __dirname
  const sampleWorker = createWorker({
    env: 'development',
    wtype: 'wrk-sample-api',
    apiPort: 1338,
    serviceRoot
  }, grapes)
  await sampleWorker.start()

  const request = getRequest(sampleWorker) // make requests to the worker with this object
  console.log('Ready!!')
  return { request }
}

function getRequest (wrk) {
  const cl = createClient(wrk)
  return (query) => {
    return new Promise((resolve, reject) => {
      const timeout = 1000000
      cl.request(query, { timeout }, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
}

async function test () {
  try {
    const { request } = await start()
    const token = ['ADM-1235', '']
    const query = {
      action: 'sampleEndpoint',
      args: [token]
    }
    const data = await request(query)
    console.log('data should be true: ', data)

    const token2 = ['should be false']
    const query2 = {
      action: 'sampleEndpoint',
      args: [token2]
    }
    const data2 = await request(query2)
    console.log('data2 should be false: ', data2)

    const googleEmailQuery = {
      action: 'getEmail',
      args: [
        {
          access_token: 'sample-access-token',
          refresh_token: 'sample-refresh-token',
          scope: 'https://www.googleapis.com/auth/userinfo.profile',
          token_type: 'Bearer',
          id_token: 'sample-id-token',
          expiry_date: 1617197867317
        }
      ]
    }
    const email = await request(googleEmailQuery)
    console.log('email is ...', email)

  } catch (err) {
    console.error(err)
  }
}
test()
