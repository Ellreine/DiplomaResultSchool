const express = require('express')
const Booking = require('../models/Booking')
const Room = require('../models/Room') // Для обновления статуса комнаты при бронировании/отмене
const authenticateToken = require('../middleware/authenticateToken')
const checkRole = require('../middleware/checkRole')
const router = express.Router()

// Создание нового бронирования
router.post('/', authenticateToken, async (req, res) => {
	try {
		const { room, startDate, endDate } = req.body
		const userId = req.user.userId

		// Проверка доступности номера
		const isAvailable = await Room.findOne({ _id: room, status: 'available' })
		if (!isAvailable) {
			return res.status(400).json({
				msg: 'Room is not available for booking. Please try choose another date',
			})
		}

		const newBooking = new Booking({
			user: userId,
			room,
			startDate,
			endDate,
			status: 'active',
		})

		const booking = await newBooking.save()

		// Обновление статуса номера на "забронировано"
		await Room.findByIdAndUpdate(room, { status: 'booked' })

		res.json(booking)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// Получение списка бронирований пользователя
router.get('/user/:userId', authenticateToken, async (req, res) => {
	try {
		if (req.params.userId !== req.user.userId) {
			return res.status(403).send('Access Denied')
		}

		const bookings = await Booking.find({ user: req.params.userId }).populate(
			'room'
		)
		res.json(bookings)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

router.delete('/:bookingId', authenticateToken, async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.bookingId)

		// Проверяем права пользователя
		if (req.user.role !== 'admin') {
			return res
				.status(403)
				.json({ msg: 'Not authorized to delete this booking' })
		}

		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' })
		}

		// Если бронирование было активно, обновляем статус комнаты
		if (booking.status === 'active') {
			await Room.findByIdAndUpdate(booking.room, { status: 'available' })
		}

		// Удаление бронирования
		await Booking.findByIdAndDelete(req.params.bookingId)

		res.json({ msg: 'Booking deleted successfully' })
	} catch (err) {
		console.error(err)
		res.status(500).send('Server Error')
	}
})

router.patch('/:bookingId', authenticateToken, async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.bookingId).populate(
			'user'
		)

		// Проверяем права пользователя
		if (
			booking.user._id.toString() !== req.user.userId &&
			req.user.role !== 'admin'
		) {
			return res
				.status(403)
				.json({ msg: 'Not authorized to cancel this booking' })
		}

		// Обновляем статус бронирования
		const updatedBooking = await Booking.findByIdAndUpdate(
			req.params.bookingId,
			{ status: 'cancelled' },
			{ new: true }
		)

		// Если бронирование было активно, обновляем статус комнаты
		if (booking.status === 'active') {
			await Room.findByIdAndUpdate(booking.room, { status: 'available' })
		}
		res.json(updatedBooking)
	} catch (err) {
		console.error(err)
		res.status(500).send('Server Error')
	}
})

// Получение списка всех бронирований для администраторов
router.get('/all', authenticateToken, checkRole('admin'), async (req, res) => {
	try {
		const bookings = await Booking.find().populate('user').populate('room')
		res.json(bookings)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
