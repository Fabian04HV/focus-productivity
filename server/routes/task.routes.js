const express = require('express');
const router = express.Router()

router.get('/tasks', (req, res) => {
  const tasks = [
    {title: 'Go to the Gym', color: '#0071FF', deadline: '12:00'},
    {title: 'prepare presentation slides', color: 'red', deadline: '21:00'}
  ]
  res.json({ tasks })
})

module.exports = router