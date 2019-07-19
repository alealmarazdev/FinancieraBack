const jwt = require('jsonwebtoken')

const { model: User } = require('../models/user')
const bcrypt = require('../lib/bcrypt')

const signUp = async (userData = {}) => {
  const {
    email,
    password,
    fullName,
    userName,
    age,
    gender,
    createdAt,
    isActived,
    isBloquedForum,
    lastLogin,
    ocupation,
    city,
    score,
    isAdmin
  } = userData

  const hash = await bcrypt.hash(password)

  const user = new User({
    email,
    password: hash,
    fullName,
    userName,
    age,
    gender,
    createdAt,
    isActived,
    isBloquedForum,
    lastLogin,
    ocupation,
    city,
    score,
    isAdmin
  })

  const error = user.validateSync()
  if (error) throw error

  return user.save()
}

const logIn = async (email, password) => {
  const user = await User.findOne({ email }).lean()
  if (!user) throw new Error('Email ó contraseña incorrecta')

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) throw new Error('Email ó contraseña incorrecta')

  return jwt.sign({ id: user._id }, 'secretword', { expiresIn: '7d' })
}

const deleteById = (userId) => User.findByIdAndDelete(userId)

const updateById = (userId, userData) => User.findByIdAndUpdate(userId, userData)

const getAll = async () => {
  const allUser = await User.find().lean()
  const cleanUsers = allUser.map((user) => {
    const { password, ...cleanUser } = user
    return cleanUser
  })
  return cleanUsers
}

const getById = async (userId) => {
  const user = await User.findById(userId).lean()
  const { password, ...cleanUser } = user
  return cleanUser
}

// const updateScore = async (userId, points) => {
//  const user = await User.findById(userId).lean()
//  let { score } = user
//  score = score + points
//  return score
// }

module.exports = {
  signUp,
  logIn,
  deleteById,
  updateById,
  getAll,
  getById
}
