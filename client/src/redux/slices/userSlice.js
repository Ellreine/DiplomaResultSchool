import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../../api/authApi'

export const loginUser = createAsyncThunk(
	'user/login',
	async (userData, { rejectWithValue }) => {
		try {
			const data = await authApi.loginUser(userData)

			localStorage.setItem('token', data.token)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const registerUser = createAsyncThunk(
	'user/register',
	async (userData, { rejectWithValue }) => {
		try {
			const data = await authApi.registerUser(userData)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const validateTokenAndLoadUser = createAsyncThunk(
	'user/validateToken',
	async (_, { dispatch }) => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const user = await authApi.validateToken()

				dispatch(setUser(user))
			} catch (error) {
				console.error('Token validation error:', error)
				dispatch(logout())
			}
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
		isAuthenticated: false,
		token: null,
		status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload
			state.isAuthenticated = true
		},
		clearUser: state => {
			state.userInfo = {}
			state.isAuthenticated = false
		},
		logout: state => {
			state.userInfo = null
			state.isAuthenticated = false
			state.token = null
			localStorage.removeItem('token')
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.status = 'loading'
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.userInfo = action.payload.user
				state.isAuthenticated = true
				state.token = action.payload.token // Сохранение токена в состоянии
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
				localStorage.removeItem('token') // Удаляем токен из localStorage в случае ошибки
			})
	},
})

export const { setUser, clearUser, logout } = userSlice.actions

export default userSlice.reducer
