import axios from './axiosConfig'

export const fetchBookings = async userId => {
	try {
		const { data } = await axios.get(`/bookings/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return data
	} catch (error) {
		console.error('Fetch bookings error:', error.response?.data?.msg || error)
		throw error
	}
}

export const createBooking = async bookingInfo => {
	try {
		const response = await axios.post('/bookings', bookingInfo, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return response.data
	} catch (error) {
		console.error('Booking error:', error.response.data.msg || error)
		throw error
	}
}

export const cancelBooking = async bookingId => {
	const { data } = await axios.patch(
		`/bookings/${bookingId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	)
	return data
}

export const fetchAllBookings = async () => {
	const response = await axios.get('/bookings/all', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	console.log('api all booking', response.data)
	return response.data
}

export const deleteBooking = async bookingId => {
	const { data } = await axios.delete(`/bookings/${bookingId}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	return data
}
