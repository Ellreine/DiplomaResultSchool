import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegisterPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// Инициализация Formik
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Enter your username'),
			email: Yup.string().email('Invalid email').required('Enter your email'),
			password: Yup.string()
				.min(6, 'Password must be at least 6 characters long')
				.required('Enter your password'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match')
				.required('Repeat your password'),
		}),
		onSubmit: values => {
			const { username, email, password } = values
			dispatch(registerUser({ username, email, password }))
				.unwrap()
				.then(() => {
					toast.success('Registration successful!')
					navigate('/login')
				})
				.catch(err => {
					toast.error(err.message || 'Registration failed. Please try again.')
				})
		},
	})

	return (
		<div className='flex flex-col py-20 min-h-screen h-full'>
			<div className='bg-gray-300/80 backdrop-blur-xl p-10 mt-10 mx-auto max-w-md w-full rounded-xl shadow-xl flex flex-col justify-around gap-8'>
				<h2 className='mx-auto text-2xl'>Register</h2>
				<form
					onSubmit={formik.handleSubmit}
					className='text-md flex flex-col gap-6'
				>
					{/* Username */}
					<div>
						<label className='block  font-medium text-gray-700'>Username</label>
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
								type='text'
								className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-10'
								{...formik.getFieldProps('username')}
							/>
						</div>
						{formik.touched.username && formik.errors.username ? (
							<div className='text-red-700'>{formik.errors.username}</div>
						) : null}
					</div>
					{/* Email */}
					<div>
						<label className='block  font-medium text-gray-700'>Email</label>
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
										d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
									/>
								</svg>
							</div>
							<input
								type='email'
								className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-10'
								{...formik.getFieldProps('email')}
							/>
						</div>
						{formik.touched.email && formik.errors.email ? (
							<div className='text-red-700'>{formik.errors.email}</div>
						) : null}
					</div>
					{/* Password */}
					<div>
						<label className='block  font-medium text-gray-700'>Password</label>
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
								type='password'
								className='border-gray-300 rounded-md w-full focus:border-blue-700 focus:ring-blue-700 pl-10'
								{...formik.getFieldProps('password')}
							/>
						</div>
						{formik.touched.password && formik.errors.password ? (
							<div className='text-red-700 self-center'>
								{formik.errors.password}
							</div>
						) : null}
					</div>
					{/* Confirm Password */}
					<div>
						<label className='block  font-medium text-gray-700'>
							Confirm Password
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
								type='password'
								className='border-gray-300 rounded-md w-full focus:border-blue-700 focus:ring-blue-700 pl-10'
								{...formik.getFieldProps('confirmPassword')}
							/>
						</div>
						{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
							<div className='text-red-700 self-center'>
								{formik.errors.confirmPassword}
							</div>
						) : null}
					</div>

					<button
						className='bg-green-600 p-2 w-20 rounded-md self-center text-gray-100'
						type='submit'
					>
						Register
					</button>
				</form>
				<p className='self-center text-center'>
					Already have an account?{' '}
					<Link to='/login'>
						<span className='hover:text-green-600 font-semibold'>
							<br />
							Login here
						</span>
					</Link>
				</p>
			</div>
		</div>
	)
}

export default RegisterPage
