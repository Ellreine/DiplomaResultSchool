const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Секретный ключ для JWT, лучше хранить в переменных окружения
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

// Регистрация нового пользователя
router.post('/register', async (req, res) => {
	try {
		const { username, email, password, role } = req.body

		// Проверка наличия пользователя с таким же email
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ message: 'User already exists' })
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание нового пользователя
		user = new User({
			username,
			email,
			password: hashedPassword,
			role: 'user',
		})

		await user.save()

		// Создание JWT
		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

		res.status(201).json({ token })
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server error')
	}
})

// Вход пользователя
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		// Ищем пользователя по email и исключаем пароль из возвращаемых данных
		const user = await User.findOne({ email }).select('-password')
		if (!user) {
			return res.status(400).json({ message: 'User does not exist' })
		}

		// Исключили пароль из первоначального запроса => необходимо загрузить его для проверки
		const fullUser = await User.findOne({ email })
		const isMatch = await bcrypt.compare(password, fullUser.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		// Создание JWT
		const token = jwt.sign(
			{ userId: user.id, role: user.role }, // Используем идентификатор и роль из результата запроса без пароля
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		// Возвращаем токен и данные пользователя (без пароля)
		res.json({ token, user: user.toObject({ getters: true }) }) // Преобразование документа Mongoose в объект
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server error')
	}
})

// Эндпоинт для проверки токена и получения данных пользователя
router.get('/validateToken', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'No token provided' })
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		const user = await User.findById(decoded.userId).select('-password')
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.json({ user })
	} catch (error) {
		res.status(500).json({ message: 'Failed to authenticate token' })
	}
})

module.exports = router
