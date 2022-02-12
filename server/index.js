require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()