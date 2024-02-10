const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	pricePerNight: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ['available', 'booked'],
	},
	description: {
		type: String,
		required: true,
	},
	photos: [
		{
			type: String,
		},
	],
})

module.exports = mongoose.model('Room', RoomSchema)
