import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as bookingsApi from '../../api/bookingsApi'

export const fetchUserBookings = createAsyncThunk(
	'bookings/fetchUserBookings',
	async (userId, { rejectWithValue }) => {
		try {
			const data = await bookingsApi.fetchBookings(userId)
			console.log('SliceBooking', data)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const createBooking = createAsyncThunk(
	'bookings/createBooking',
	async (bookingInfo, { rejectWithValue }) => {
		try {
			const data = await bookingsApi.createBooking(bookingInfo)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const cancelBooking = createAsyncThunk(
	'bookings/cancelBooking',
	async (bookingId, { rejectWithValue }) => {
		try {
			const data = await bookingsApi.cancelBooking(bookingId)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchAllBookings = createAsyncThunk(
	'bookings/fetchAllBookings',
	async (_, { rejectWithValue }) => {
		try {
			const response = await bookingsApi.fetchAllBookings()
			console.log('Slice booking', response)
			return response
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (bookingId, { rejectWithValue }) => {
		try {
			const response = await bookingsApi.deleteBooking(bookingId)
			return response
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const bookingSlice = createSlice({
	name: 'bookings',
	initialState: {
		bookings: [],
		status: 'idle',
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserBookings.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchUserBookings.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.bookings = action.payload
			})
			.addCase(fetchUserBookings.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(createBooking.fulfilled, (state, action) => {
				state.bookings.push(action.payload)
			})
			.addCase(fetchAllBookings.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.bookings = action.payload
			})
			// Обработка состояний для отмены бронирования
			.addCase(cancelBooking.fulfilled, (state, action) => {
				const index = state.bookings.findIndex(
					booking => booking._id === action.payload._id
				)
				if (index !== -1) {
					state.bookings[index].status = 'cancelled' // Обновляем статус на 'cancelled'
				}
			})
			.addCase(deleteBooking.fulfilled, (state, action) => {
				state.bookings = state.bookings.filter(
					booking => booking._id !== action.meta.arg
				)
			})
	},
})

export default bookingSlice.reducer
