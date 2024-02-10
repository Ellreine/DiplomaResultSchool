const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'completed', 'cancelled'],
			default: 'active',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
