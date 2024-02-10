import axios from './axiosConfig'

export const loginUser = async credentials => {
	const { data } = await axios.post('/auth/login', credentials)
	console.log('Ответ сервера на запрос логина:', data)
	return data
}

export const registerUser = async userInfo => {
	try {
		const { data } = await axios.post('/auth/register', userInfo)
		return data
	} catch (error) {
		// Логирование для отладки
		console.error('Error:', error)

		// Проверяем, есть ли объект ответа
		if (error.response) {
			// Если есть объект ответа, выбрасываем ошибку с серверным сообщением
			throw error
		} else {
			// Если объекта ответа нет, выбрасываем ошибку с общим сообщением
			throw new Error('Registration failed. Please try again.')
		}
	}
}

export const validateToken = async () => {
	const token = localStorage.getItem('token')
	if (!token) {
		throw new Error('No token found')
	}
	try {
		const response = await axios.get('/auth/validateToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data.user
	} catch (error) {
		console.error('Token validation error:', error)
		throw error
	}
}
