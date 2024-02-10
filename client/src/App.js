import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { validateTokenAndLoadUser } from './redux/slices/userSlice'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RoomsPage from './pages/RoomsPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import MyBookingsPage from './pages/MyBookingsPage'
import AdminPanelPage from './pages/AdminPanelPage'
import CreateRoomPage from './pages/CreateRoomPage'
import ProtectedRoute from './components/ProtectedRoute'
import RoomDetailsPage from './pages/RoomDetailsPage'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(validateTokenAndLoadUser())
	}, [dispatch])

	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/rooms' element={<RoomsPage />} />
					<Route path='/rooms/:roomId' element={<RoomDetailsPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/my-bookings' element={<MyBookingsPage />} />

					<Route
						path='/admin-panel'
						element={
							<ProtectedRoute allowedRoles={['admin']}>
								<AdminPanelPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/create-room'
						element={
							<ProtectedRoute allowedRoles={['admin']}>
								<CreateRoomPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
				<Footer />
			</Router>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	)
}

export default App
