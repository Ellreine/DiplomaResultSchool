module.exports = function (upload) {
	const express = require('express')
	const Room = require('../models/Room')
	const Booking = require('../models/Booking')
	const authenticateToken = require('../middleware/authenticateToken')
	const checkRole = require('../middleware/checkRole')
	const router = express.Router()

	// Получение списка всех номеров
	router.get('/', async (req, res) => {
		try {
			const rooms = await Room.find()
			res.json(rooms)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	})

	// Получение информации о конкретном номере
	router.get('/:id', async (req, res) => {
		try {
			const room = await Room.findById(req.params.id)
			if (!room) {
				return res.status(404).json({ msg: 'Room not found' })
			}
			res.json(room)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	})

	router.post(
		'/',
		authenticateToken,
		checkRole('admin'),
		upload.array('photos', 5),
		async (req, res) => {
			try {
				console.log(res.files)
				const photoURLs = req.files.map(file => '/uploads/' + file.filename)

				const newRoom = new Room({
					...req.body,
					photos: photoURLs,
				})

				const room = await newRoom.save()
				res.json(room)
			} catch (err) {
				console.error(err.message)
				res.status(500).send('Server Error')
			}
		}
	)

	// Обновление информации о номере (только для администраторов)
	router.put(
		'/:id',
		authenticateToken,
		checkRole('admin'),
		async (req, res) => {
			try {
				const room = await Room.findByIdAndUpdate(
					req.params.id,
					{ $set: req.body },
					{ new: true }
				)
				if (!room) {
					return res.status(404).json({ msg: 'Room not found' })
				}
				res.json(room)
			} catch (err) {
				console.error(err.message)
				res.status(500).send('Server Error')
			}
		}
	)

	// Удаление номера (только для администраторов)
	router.delete(
		'/:id',
		authenticateToken,
		checkRole('admin'),
		async (req, res) => {
			try {
				const roomId = req.params.id

				// Поиск и удаление всех бронирований, связанных с удаляемой комнатой
				await Booking.deleteMany({ room: roomId })

				// Удаление самой комнаты
				const room = await Room.findByIdAndDelete(roomId)
				if (!room) {
					return res.status(404).json({ msg: 'Room not found' })
				}

				res.json({ msg: 'Room and related bookings deleted successfully' })
			} catch (err) {
				console.error(err.message)
				res.status(500).send('Server Error')
			}
		}
	)

	// Обновление статуса комнаты (только для администраторов)
	router.patch(
		'/:id',
		authenticateToken,
		checkRole('admin'),
		async (req, res) => {
			try {
				const { status } = req.body
				const room = await Room.findByIdAndUpdate(
					req.params.id,
					{ status },
					{ new: true }
				)

				if (!room) {
					return res.status(404).json({ msg: 'Room not found' })
				}

				res.json(room)
			} catch (err) {
				console.error(err.message)
				res.status(500).send('Server Error')
			}
		}
	)

	return router
}
