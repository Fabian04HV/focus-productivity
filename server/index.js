const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const app = express();
dotenv.config()
const MONGOURI = process.env.MONGO_URI

mongoose.connect(MONGOURI).then(() => {
  console.log('Database is connected successfully')
})
.catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173" }))

const taskRoutes = require('./routes/task.routes')
app.use('/api', taskRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})