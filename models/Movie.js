const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
	movieName: {
		type: String,
	},
	seen: {
		type: Boolean,
	},
})
module.exports = mongoose.model('Movie', MovieSchema)
