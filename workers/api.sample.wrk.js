'use strict'

const { WrkApi } = require('bfx-wrk-api')

class Worker extends WrkApi {
  constructor (conf, ctx) {
    super(conf, ctx)
    this.init()
    this.start()
  }

  getPluginCtx (type) {
    const ctx = super.getPluginCtx(type)

    switch (type) {
      case 'api_bfx':
        ctx.auth_google = this.authGoogle_a0
        break
    }

    return ctx
  }

  setupFacs () {
    return [
      ['fac', 'bfx-facs-auth-google', 'a0', 'a0']
    ]
  }

  init () {
    super.init()
    const facs = this.setupFacs()
    this.setInitFacs(facs)
  }
}

module.exports = Worker
