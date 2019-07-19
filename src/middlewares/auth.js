const user = require('../usecases/user')

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const jwtDecoded = user.verifyJwt(authorization)
    console.log('jwt: ', jwtDecoded) 
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'token required',
      error: 'authorization header required'
    })
  }
}

module.exports = auth
