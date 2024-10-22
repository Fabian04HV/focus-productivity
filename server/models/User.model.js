const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  flashcardSets: [{
    type: Schema.Types.ObjectId,
    ref: 'FlashcardSet'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
}, {
  timestamps: true
})

const User = mongoose.model('User', UserSchema)
module.exports = User