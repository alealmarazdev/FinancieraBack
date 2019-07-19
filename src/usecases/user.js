const jwt = require('jsonwebtoken')
const moment = require('moment')


const { model: User } = require('../models/user')
const { model: Theme } = require('../models/theme')
const { model: Progress } = require('../models/progress')
const useProgress = require ('../usecases/progress')
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
  const date = await moment().format()

  const user = new User({
    email,
    password: hash,
    fullName,
    userName,
    age,
    gender,
    createdAt: date,
    isActived,
    isBloquedForum,
    lastLogin: date,
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
  const date = await moment().format()
  const userData = {lastLogin: date}

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

const updateScore = async (userId, themeId) => {
  
  const theme = await Theme.findById(themeId).lean()
  let userInfo = await User.findById(userId).lean()

  const { score }= userInfo
  const { topic, numSerial, expPoints } = theme
  
  const newScore = score+expPoints

  const scoreData = {
    score: newScore
  }

  const ProgressData ={
    idUser: userId,
    idTopic: topic,
    idTheme: themeId,
    lastLevel: numSerial
  }

  const findData = {
    idUser: userId,
    idTopic: topic
  }
  
  let progress = await Progress.find(findData).lean()

  if(!progress[0]){
    console.log('object')
    progress = await useProgress.newProgress(ProgressData)
    userInfo = await User.findByIdAndUpdate(userId, scoreData)
    return userInfo
  }

  else{
    const { lastLevel, _id} = progress[0]
    if(lastLevel<numSerial){
    userInfo = await User.findByIdAndUpdate(userId, scoreData)
    progressInfo= await Progress.findByIdAndUpdate(_id,ProgressData)  
    }

    else {
      return userInfo
    }
  }

  return userInfo

}

const verifyJwt = token => jwt.verify(token,'secretword')

module.exports = {
  signUp,
  logIn,
  deleteById,
  updateById,
  getAll,
  getById,
  updateScore,
  verifyJwt
}
