'use strict'

const { WrkApi } = require('bfx-wrk-api')

class Worker extends WrkApi {
  constructor (conf, ctx) {
    super(conf, ctx)
    this.loadWorkersConfig()
    this.init()
    this.start()
  }

  loadWorkersConfig () {

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
