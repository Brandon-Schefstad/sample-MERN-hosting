const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001
require('dotenv').config({ path: './config/.env' })
const bodyParser = require('body-parser')
const cors = require('cors')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}
async function connect() {
	connectDB().then(
		app.listen(process.env.PORT || 2121, () => {
			console.log(`http://localhost:${process.env.PORT}`)
		})
	)
}
app.use(logger('dev'))
connect()
app.get('/', (req, res) => {
	res.json({ Hello: 'World' })
})
