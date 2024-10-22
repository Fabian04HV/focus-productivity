const express = require('express');
const Task = require('../models/Task.model');
const router = express.Router()
const { validateToken } = require('../utils/jwtUtils');
const User = require('../models/User.model');

router.get('/tasks', validateToken, (req, res) => {

  const userId = req.user._id

  User.findOne({_id: userId})
  .populate('tasks')
  .then(user => {
    const { tasks } = user
    res.json(tasks)
  })
  .catch(error => console.log("Error in get /task route: ", error))
})

router.post('/newtask', validateToken, (req, res) => {
  const { title, deadline, color } = req.body
  const userId = req.user._id

  if(!userId){
    return res.status(500).json({ message: 'Server Error: User not authenticated'})
  }

  if(title){
    Task.create({ title, deadline, color })
    .then(createdTask => {
      User.findByIdAndUpdate(
        userId, 
        { $addToSet: { tasks: createdTask._id } },
        { new: true }
      )
      .then(updatedUser => {
        res.json(updatedUser)
      })      
      // res.status(201).send({ message: `Task created successfully: ${createdTask}` })
    })
    .catch(error => console.log('Error happening in /newtask post router', error))
  }


})

module.exports = router