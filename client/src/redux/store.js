import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import roomReducer from './slices/roomSlice'
import bookingReducer from './slices/bookingSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		rooms: roomReducer,
		bookings: bookingReducer,
	},
})
