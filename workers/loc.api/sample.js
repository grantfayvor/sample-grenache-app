const { Api } = require('bfx-wrk-api')

class Sample extends Api {
  async sampleEndpoint (space, token, cb) {
    try {
      const authGoolge = this.ctx.auth_google
      const res = await authGoolge.preAdminTokenCheck(token)
      cb(null, res)
    } catch (e) {
      cb(e)
    }
  }
}

module.exports = Sample
