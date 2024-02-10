import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserBookings, cancelBooking } from '../redux/slices/bookingSlice'
import { toast } from 'react-toastify'
import BookingCard from '../components/BookingCard'
import Loader from '../components/Loader'

const MyBookingsPage = () => {
	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.user)
	const { bookings, status, error } = useSelector(state => state.bookings)

	useEffect(() => {
		if (userInfo && userInfo._id) {
			dispatch(fetchUserBookings(userInfo._id))
		}
	}, [dispatch, userInfo])

	const activeBookings = bookings.filter(booking => booking.status === 'active')
	const cancelledBookings = bookings.filter(
		booking => booking.status === 'cancelled'
	)

	const handleCancelBooking = async bookingId => {
		try {
			await dispatch(cancelBooking(bookingId)).unwrap()
			toast.success('Booking cancelled successfully')
			dispatch(fetchUserBookings(userInfo._id))
		} catch (err) {
			toast.error('Error cancelling the booking')
		}
	}

	if (status === 'loading') {
		return <Loader />
	}

	if (error) {
		return <div>Error fetching bookings: {error}</div>
	}

	return (
		<div className='flex flex-col py-20 min-h-screen h-full'>
			<h1 className='text-3xl font-semibold text-center mb-8'>My Bookings</h1>

			{bookings.length === 0 ? (
				<p className='text-center'>No bookings found.</p>
			) : (
				<>
					{activeBookings.length > 0 && (
						<>
							<h2 className='text-xl font-bold text-center mb-4'>Active</h2>

							<ul className='grid grid-cols-1 md:grid-cols-2 gap-4 px-16'>
								{activeBookings.map(booking => (
									<BookingCard
										key={booking._id}
										booking={booking}
										onActionClick={handleCancelBooking}
										actionLabel='Cancel Booking'
										actionStyle='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									/>
								))}
							</ul>
						</>
					)}

					{cancelledBookings.length > 0 && (
						<>
							<h2 className='text-xl font-bold text-center mb-4 mt-8'>
								Cancelled
							</h2>

							<ul className='grid grid-cols-1 md:grid-cols-2 gap-4 px-16'>
								{cancelledBookings.map(booking => (
									<BookingCard key={booking._id} booking={booking} />
								))}
							</ul>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default MyBookingsPage
