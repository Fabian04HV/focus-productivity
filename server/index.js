const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express();
dotenv.config()
const MONGOURI = process.env.MONGO_URI

mongoose.connect(MONGOURI).then(() => {
  console.log('Database is connected successfully')
})
.catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const taskRoutes = require('./routes/task.routes')

app.use(cors({ origin: "http://localhost:5173" }))

app.use('/api', taskRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})