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

  async getEmail (space, token, cb) {
    try {
      const authGoogle = this.ctx.auth_google
      const res = await authGoogle.googleEmailFromToken(token)
      cb(null, res)
    } catch (err) {
      console.error(err)
      cb(err)
    }
  }
}

module.exports = Sample
