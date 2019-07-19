const { model: Theme } = require('../models/theme')

const newTheme = async (themeData = {}) => {
  const {
    name,
    icon,
    description,
    expPoints,
    content,
    video,
    numSerial,
    topic
  } = themeData

  const theme = new Theme({
    name,
    icon,
    description,
    expPoints,
    content,
    video,
    numSerial,
    topic
  })
  const error = theme.validateSync()
  if (error) throw error

  return theme.save()
}

const updateById = (themeId, themeData) => Theme.findByIdAndUpdate(themeId, themeData)

const deleteById = (themeId) => Theme.findByIdAndDelete(themeId)

const getAll = async () => {
  const allthemes = await Theme.find().lean()
  return allthemes
}

const getById = async (themeId) => {
  const foundTheme = await Theme.findById(themeId).lean()
  return foundTheme
}

module.exports = {
  newTheme,
  updateById,
  deleteById,
  getAll,
  getById
}
