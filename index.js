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
    wtype: 'wrk-sample',
    NODE_APP_INSTANCE: 'test',
    logs: { logs: true },
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

start()
