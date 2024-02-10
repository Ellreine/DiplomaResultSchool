import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/userSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(loginUser({ email, password }))
			.unwrap()
			.then(() => {
				toast.success('Login successful!')
				navigate('/')
			})
			.catch(err => {
				const errorMessage =
					err.response?.data?.message || 'Login failed. Please try again.'
				setError(errorMessage)
				console.log(email, password, errorMessage)
			})
	}

	return (
		<div className='flex flex-col py-20 min-h-screen h-full'>
			<div className='bg-gray-300/80 backdrop-blur-xl p-10 mt-10 mx-auto max-w-md w-full rounded-xl shadow-xl flex flex-col justify-around gap-8'>
				<h2 className='mx-auto text-2xl'>Login</h2>
				<form onSubmit={handleSubmit} className='text-md flex flex-col gap-6'>
					<div>
						<label className='block  font-medium text-gray-700'>Email:</label>
						<div className='relative rounded-md shadow-sm mt-1'>
							<div className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<svg
									className='h-5 w-5 text-gray-400'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
									/>
								</svg>
							</div>
							<input
								className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-10'
								type='email'
								required
								placeholder='Enter Email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<label className='block  font-medium text-gray-700'>
							Password:
						</label>
						<div className='relative rounded-md shadow-sm mt-1'>
							<div className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<svg
									className='h-5 w-5 text-gray-400'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
									/>
								</svg>
							</div>
							<input
								className='border-gray-300 rounded-md w-full focus:border-blue-700 focus:ring-blue-700 pl-10'
								type='password'
								required
								placeholder='Enter password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
					</div>
					{error && <div className='text-red-700 self-center'>{error}</div>}
					<button
						type='submit'
						className='bg-green-600 p-2 w-20 rounded-md self-center text-gray-100'
					>
						Sign In
					</button>
				</form>
				<p className='self-center text-center'>
					Don't have an account?{' '}
					<NavLink to='/register'>
						<span className='hover:text-green-600 font-semibold'>
							<br />
							Register here
						</span>
					</NavLink>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
