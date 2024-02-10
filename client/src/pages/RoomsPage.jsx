import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRooms } from '../redux/slices/roomSlice'
import { createBooking } from '../api/bookingsApi.js'
import { toast } from 'react-toastify'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RoomCard from '../components/RoomCard'
import Loader from '../components/Loader.jsx'

const RoomsList = () => {
	const dispatch = useDispatch()
	const { rooms, status, error } = useSelector(state => state.rooms)
	const { isAuthenticated } = useSelector(state => state.user)
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	useEffect(() => {
		dispatch(fetchRooms())
	}, [dispatch])

	const handleBooking = async roomId => {
		if (!startDate || !endDate) {
			toast.error('Please select the dates before booking.')
			return
		}

		if (endDate < startDate) {
			toast.error('End date cannot be before start date.')
			return
		}

		const bookingDetails = {
			room: roomId,
			startDate,
			endDate,
		}

		try {
			await createBooking(bookingDetails)
			toast.success('Room booked successfully!')
			dispatch(fetchRooms())
		} catch (error) {
			toast.error(
				error.response.data.msg || 'Booking failed. Please try again.'
			)
			console.error('Booking error:', error)
		}
	}

	if (status === 'loading') {
		return <Loader />
	}

	if (error) return <div>Error: {error}</div>

	return (
		<div className='flex flex-col py-20 min-h-screen h-full px-4 md:px-8'>
			<h1 className='text-3xl font-semibold text-center mb-8'>Rooms</h1>
			{isAuthenticated && (
				<div className='mb-6 self-center flex justify-center items-center flex-col'>
					<label className='block self-end'>
						Start Date:
						<ReactDatePicker
							selected={startDate}
							onChange={date => setStartDate(date)}
							className='border rounded ml-2 px-2 py-1'
						/>
					</label>
					<label className='block mt-4 self-end'>
						End Date:
						<ReactDatePicker
							selected={endDate}
							minDate={startDate}
							onChange={date => setEndDate(date)}
							className='border rounded ml-2 px-2 py-1'
						/>
					</label>
				</div>
			)}

			<ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{rooms.map(room => (
					<RoomCard
						key={room._id}
						room={room}
						handleBooking={handleBooking}
						isAuthenticated={isAuthenticated}
					/>
				))}
			</ul>

			{!isAuthenticated && (
				<p className='text-center mt-6'>Please log in to book rooms.</p>
			)}
		</div>
	)
}

export default RoomsList
