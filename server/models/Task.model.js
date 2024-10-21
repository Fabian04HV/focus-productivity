const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  deadline: String,
  color: String
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task