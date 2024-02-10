import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as roomsApi from '../../api/roomsApi'

export const fetchRooms = createAsyncThunk(
	'rooms/fetchRooms',
	async (_, { rejectWithValue }) => {
		try {
			const data = await roomsApi.fetchRooms()
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const createRoom = createAsyncThunk(
	'rooms/createRoom',
	async (formData, { rejectWithValue }) => {
		try {
			const response = await roomsApi.createRoom(formData)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (roomId, { rejectWithValue }) => {
		try {
			const response = await roomsApi.deleteRoomApi(roomId)
			return response.data // Возвращаем ID удаленной комнаты
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const updateRoomStatus = createAsyncThunk(
	'rooms/updateRoomStatus',
	async ({ roomId, status }, { rejectWithValue }) => {
		try {
			const response = await roomsApi.updateRoomStatusApi(roomId, status)
			return response
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const roomSlice = createSlice({
	name: 'rooms',
	initialState: {
		rooms: [],
		status: 'idle',
		error: null,
	},

	extraReducers: builder => {
		builder
			.addCase(fetchRooms.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchRooms.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.rooms = action.payload
			})
			.addCase(fetchRooms.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})

			.addCase(deleteRoom.fulfilled, (state, action) => {
				state.rooms = state.rooms.filter(room => room._id !== action.payload)
				state.needUpdate = !state.needUpdate
			})
			.addCase(updateRoomStatus.fulfilled, (state, action) => {
				console.log(action)
				const index = state.rooms.findIndex(
					room => room._id === action.payload._id
				)
				if (index !== -1) {
					state.rooms[index] = action.payload
				}
			})
	},
})

export default roomSlice.reducer
