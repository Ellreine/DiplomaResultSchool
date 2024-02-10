import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	fetchRooms,
	deleteRoom,
	updateRoomStatus,
} from '../redux/slices/roomSlice'
import {
	fetchAllBookings,
	cancelBooking,
	deleteBooking,
} from '../redux/slices/bookingSlice'
import { NavLink } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import Loader from '../components/Loader'

const AdminPanelPage = () => {
	const dispatch = useDispatch()
	const { rooms, status, needUpdate } = useSelector(state => state.rooms)
	const { bookings } = useSelector(state => state.bookings)
	const { userInfo } = useSelector(state => state.user)

	console.log(bookings)

	useEffect(() => {
		if (userInfo.role === 'admin') {
			dispatch(fetchRooms())
			dispatch(fetchAllBookings())
		}
	}, [dispatch, userInfo, needUpdate])

	const handleDeleteRoom = roomId => {
		if (window.confirm('Are you sure you want to delete this room?')) {
			dispatch(deleteRoom(roomId))
		}
	}

	const handleChangeStatus = (roomId, newStatus) => {
		dispatch(updateRoomStatus({ roomId, status: newStatus }))
	}

	const handleCancelBooking = bookingId => {
		if (window.confirm('Are you sure you want to cancel this booking?')) {
			dispatch(cancelBooking(bookingId))
		}
	}

	const handleDeleteBooking = bookingId => {
		if (window.confirm('Are you sure you want to delete this booking?')) {
			dispatch(deleteBooking(bookingId))
		}
	}

	const sortedBookings = bookings.slice().sort((a, b) => {
		const userA = (a.user && a.user.username) || ''
		const userB = (b.user && b.user.username) || ''
		const statusA = a.status || ''
		const statusB = b.status || ''

		return (
			userA.localeCompare(userB) ||
			statusA.localeCompare(statusB) ||
			new Date(a.startDate) - new Date(b.startDate)
		)
	})

	if (status === 'loading') {
		return <Loader />
	}

	return (
		<div className='flex flex-col pt-16 min-h-screen h-full'>
			<h2 className='text-2xl font-bold my-8 text-center'>Rooms List</h2>
			<ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{rooms.map(room => (
					<RoomCard
						key={room._id}
						room={room}
						isAdmin={true}
						handleDeleteRoom={() => handleDeleteRoom(room._id)}
						handleChangeStatus={() =>
							handleChangeStatus(
								room._id,
								room.status === 'available' ? 'booked' : 'available'
							)
						}
					/>
				))}
			</ul>

			<h2 className='text-2xl font-bold my-8 text-center'>Bookings List</h2>
			<div className='overflow-x-auto'>
				<table className='min-w-full table-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-center'>Room</th>
							<th className='px-4 py-2 text-center'>Start Date</th>
							<th className='px-4 py-2 text-center'>End Date</th>
							<th className='px-4 py-2 text-center'>Status</th>
							<th className='px-4 py-2 text-center'>Action</th>
						</tr>
					</thead>
					<tbody>
						{sortedBookings.map(booking => (
							<tr key={booking._id} className='bg-white border-b'>
								<td className='px-4 py-2 text-center align-middle'>
									{booking.room.name}
								</td>
								<td className='px-4 py-2 text-center align-middle'>
									{new Date(booking.startDate).toLocaleDateString()}
								</td>
								<td className='px-4 py-2 text-center align-middle'>
									{new Date(booking.endDate).toLocaleDateString()}
								</td>
								<td
									className={`px-4 py-2 text-center align-middle ${
										booking.status === 'active'
											? 'text-green-500'
											: 'text-red-500'
									}`}
								>
									{booking.status}
								</td>
								<td className='px-4 py-2 text-center align-middle'>
									<button
										onClick={() => handleCancelBooking(booking._id)}
										className={`mr-2 p-2 rounded ${
											booking.status === 'active'
												? 'bg-yellow-500 hover:bg-yellow-700'
												: 'bg-gray-500 '
										} text-white`}
										disabled={booking.status !== 'active'}
									>
										Cancel
									</button>
									<button
										onClick={() => handleDeleteBooking(booking._id)}
										className='bg-red-500 hover:bg-red-700 text-white p-2 rounded'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<NavLink to='/create-room' className='my-10 underline self-center'>
				<button className='bg-blue-500 p-3 text-white rounded font-semibold'>
					Create New Room
				</button>
			</NavLink>
		</div>
	)
}

export default AdminPanelPage
