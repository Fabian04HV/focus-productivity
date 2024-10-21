const express = require('express');
const Task = require('../models/Task.model');
const router = express.Router()

router.get('/tasks', (req, res) => {
  const tasks = [
    {title: 'Go to the Gym', color: '#0071FF', deadline: '12:00'},
    {title: 'prepare presentation slides', color: 'red', deadline: '21:00'}
  ]
  res.json({ tasks })
})

router.post('/newtask', (req, res) => {
  console.log(req)
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