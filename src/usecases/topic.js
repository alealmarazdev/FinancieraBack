const { model: Topic } = require('../models/topic')

const newTopic = async (topicData = {}) => {
  const {
    name,
    icon,
    description,
    requeriments,
    pisicion
  } = topicData

  const topic = new Topic({
    name,
    icon,
    description,
    requeriments,
    pisicion
  })
  const error = topic.validateSync()
  if (error) throw error

  return topic.save()
}

const updateById = (topicId, topicData) => Topic.findByIdAndUpdate(topicId, topicData)

const deleteById = (topicId) => Topic.findByIdAndDelete(topicId)

const getAll = async () => {
  const allTopics = await Topic.find().lean()
  return allTopics
}

const getById = async (topicId) => {
  const foundTopic = await Topic.findById(topicId).lean()
  return foundTopic
}

module.exports = {
  newTopic,
  updateById,
  deleteById,
  getAll,
  getById
}
