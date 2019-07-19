const { Schema, model } = require('mongoose')

const progressSchema = new Schema({
  idUser: {
    type: String,
    required: true
  },

  idTopic: {
    type: String,
    required: true
  },

  idTheme: {
    type: String,
    required: true
  }

})

module.exports = {
  Schema: progressSchema,
  model: model('Progress', progressSchema)
}
