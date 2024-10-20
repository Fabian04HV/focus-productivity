const express = require('express');
const router = express.Router()

router.get('/tasks', (req, res) => {
  const tasks = ["TestTask", "Test"]
  res.json({ tasks })
})

module.exports = router