const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const multer = require('multer')
const path = require('path')

// Настройка хранилища для Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // путь к папке загрузок
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

// Импорт маршрутов
const authRoutes = require('./routes/auth')
const bookingRoutes = require('./routes/booking')
const roomsRoutes = require('./routes/rooms')(upload)

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/* ROUTES */
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/rooms', roomsRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001
mongoose
	.connect(process.env.MONGO_URL, {
		dbName: 'HotelBooking',
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`MongoDB Connected: ${process.env.MONGO_URL}`)
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => console.log(`Database connection error: ${err}`))
