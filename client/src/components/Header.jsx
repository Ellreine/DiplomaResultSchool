import React, { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/userSlice'

const Header = memo(() => {
	const { userInfo, isAuthenticated } = useSelector(state => state.user)
	const [showDropdown, setShowDropdown] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
		setIsMenuOpen(false)
	}

	return (
		<header className='bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 '>
			<nav className='container mx-auto flex flex-col md:flex-row md:justify-center items-center py-4'>
				<div
					className='md:hidden mb-4 md:mb-0 cursor-pointer'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<i className='text-3xl'>
						{isMenuOpen ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18 18 6M6 6l12 12'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
						)}
					</i>
				</div>

				<ul
					className={`text-center ${
						isMenuOpen ? 'block' : 'hidden'
					} md:flex space-x-0 md:space-x-4 md:justify-center`}
				>
					<li>
						<NavLink
							to='/'
							className='hover:text-gray-400'
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/rooms'
							className='hover:text-gray-400'
							onClick={() => setIsMenuOpen(false)}
						>
							All Rooms
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/my-bookings'
							className='hover:text-gray-400'
							onClick={() => setIsMenuOpen(false)}
						>
							My Bookings
						</NavLink>
					</li>
					{isAuthenticated && userInfo?.role === 'admin' && (
						<li>
							<NavLink
								to='/admin-panel'
								className='hover:text-gray-400'
								onClick={() => setIsMenuOpen(false)}
							>
								Admin Panel
							</NavLink>
						</li>
					)}
					{isAuthenticated ? (
						<li
							onMouseEnter={() => setShowDropdown(true)}
							onMouseLeave={() => setShowDropdown(false)}
						>
							<button
								className='focus:outline-none'
								onClick={() => setShowDropdown(!showDropdown)}
							>
								{userInfo?.username}
							</button>
							{showDropdown && (
								<div className='absolute w-32 bg-white text-black py-2 rounded shadow-lg flex flex-col justify-center items-center text-center'>
									<NavLink
										to='/profile'
										className='block px-4 py-2 hover:bg-gray-100 '
										onClick={() => setIsMenuOpen(false)}
									>
										My Profile
									</NavLink>
									<button
										onClick={handleLogout}
										className='w-full px-4 py-2 hover:bg-gray-100 '
									>
										Logout
									</button>
								</div>
							)}
						</li>
					) : (
						<li>
							<NavLink
								to='/login'
								className='hover:text-gray-400'
								onClick={() => setIsMenuOpen(false)}
							>
								Login
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
})

export default Header
