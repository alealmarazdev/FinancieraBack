const { Schema, model } = require('mongoose')

const themeSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },

  icon: {
    type: String,
    required: true
  },

  description: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true
  },

  expPoints: {
    type: Number,
    required: true
  },

  content: {
    type: String,
    maxlength: 10000
  },

  video: {
    type: String
  },

  numSerial: {
    type: Number,
    required: true,
    default: true
  },

  topic: {
    type: String,
    default: 'general'
  }

})

module.exports = {
  Schema: themeSchema,
  model: model('Themes', themeSchema)
}
