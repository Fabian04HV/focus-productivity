const express = require('express');
const Task = require('../models/Task.model');
const router = express.Router()
const { validateToken } = require('../utils/jwtUtils')

router.get('/tasks', validateToken, (req, res) => {
  Task.find()
  .then(found => {
    res.json({ tasks: found })
  })
  .catch(error => console.log("Error in get /task route: ", error))
})

router.post('/newtask', (req, res) => {
  const { title, deadline, color } = req.body

  if(title){
    Task.create({ title, deadline, color })
    .then(createdTask => {
      res.status(201).send({ message: `Task created successfully: ${createdTask}` })
    })
    .catch(error => console.log('Error happening in /newtask post router', error))
  }
})

module.exports = router