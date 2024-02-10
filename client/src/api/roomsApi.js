import axios from './axiosConfig'

export const fetchRooms = async () => {
	const { data } = await axios.get('/rooms')
	return data
}

export const fetchRoomById = async roomId => {
	const { data } = await axios.get(`/rooms/${roomId}`)
	return data
}

export const createRoom = async formData => {
	const response = await axios.post('/rooms', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	return response.data
}

export const deleteRoomApi = async roomId => {
	const response = await axios.delete(`/rooms/${roomId}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	return response.data
}

export const updateRoomStatusApi = async (roomId, status) => {
	const response = await axios.patch(
		`/rooms/${roomId}`,
		{ status },
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	)
	return response.data
}
