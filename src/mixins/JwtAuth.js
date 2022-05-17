const axios = require('axios')
const jwt = require('jsonwebtoken')

export default {
  async getUser(jwtCookie) {
    try {
      const { data: data } = await axios.get(
        `${process.env.GRIDSOME_STRAPI_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
          },
        }
      )
      return data
    } catch (err) {
      return { error: err }
    }
  },
  validateExpiry(jwtCookie) {
    const decodedJwt = jwt.decode(jwtCookie)
    if (Date.now() >= decodedJwt.exp * 1000) {
      return false
    } else {
      return true
    }
  },
}
