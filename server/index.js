const express = require('express');
const app = express();
const cors = require('cors');

const taskRoutes = require('./routes/task.routes')

app.use(cors({ origin: "http://localhost:5173" }))

app.use('/api', taskRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})