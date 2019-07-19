const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  fullName: {
    type: String,
    minlength: 10,
    maxlength: 100
  },

  userName: {
    type: String,
    minlength: 3,
    maxlength: 50
  },

  age: {
    type: Number,
    min: 15,
    max: 100
  },

  gender: {
    type: String,
    enum: [
      'male',
      'female',
      'other'
    ],
    default: 'other'
  },

  createdAt: {
    type: Date
  },

  isActived: {
    type: Boolean,
    default: true
  },

  isBloquedForum: {
    type: Boolean,
    default: false
  },

  lastLogin: {
    type: Date
  },

  ocupation: {
    type: String,
    maxlength: 50
  },

  city: {
    type: String,
    maxlength: 50
  },

  score: {
    type: Number,
    default: 0
  },

  isAdmin: {
    type: Boolean,
    default: false
  }

})

module.exports = {
  Schema: userSchema,
  model: model('Users', userSchema)
}
