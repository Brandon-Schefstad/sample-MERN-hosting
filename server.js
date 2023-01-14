const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001
require('dotenv').config({ path: './config/.env' })
const bodyParser = require('body-parser')
const cors = require('cors')
const Movie = require('./models/Movie')

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
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.post('/', async (req, res) => {
	try {
		const newMovie = await Movie.create({
			movieName: req.body.movieToSend.movieName,
			seen: req.body.movieToSend.seen,
		})
		res.json({ newMovie })
	} catch (error) {
		console.error(error)
	}
})
app.get('/', async (req, res) => {
	console.log('fetching movies')
	const allMovies = await Movie.find()
	res.json(allMovies)
})
