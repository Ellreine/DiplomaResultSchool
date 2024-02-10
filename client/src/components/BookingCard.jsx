// RoomCard.jsx
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { formatDate } from '../utils/formatDate'

const BookingCard = ({ booking, onActionClick, actionLabel, actionStyle }) => {
	const settings = {
		dots: booking.room.photos.length > 1,
		infinite: booking.room.photos.length > 1,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 2000,
		arrows: booking.room.photos.length > 1,
		swipe: booking.room.photos.length > 1,
		draggable: booking.room.photos.length > 1,
	}

	return (
		<li className='border rounded-lg p-4 shadow-md'>
			<h3 className='text-xl font-semibold text-center'>{`Room: ${booking.room.name}`}</h3>
			<Slider {...settings}>
				{booking.room.photos.map((photo, index) => (
					<div
						key={index}
						className='flex justify-center items-center mt-2 max-w-full'
					>
						<img
							src={`http://localhost:3001${photo}`}
							alt={`Room ${booking.room.name}`}
							className='max-h-[560px] object-cover rounded-md mx-auto'
						/>
					</div>
				))}
			</Slider>
			<p className='mb-2 mt-8'>{`Start Date: ${formatDate(
				booking.startDate
			)}`}</p>
			<p className='my-2'>{`End Date: ${formatDate(booking.endDate)}`}</p>
			<p
				className={`my-2 font-bold ${
					booking.status === 'active' ? 'text-green-500' : 'text-red-500'
				}`}
			>{`Status: ${booking.status}`}</p>
			{booking.status === 'active' && onActionClick && (
				<button
					onClick={() => onActionClick(booking._id)}
					className={`mt-4 ${actionStyle}`}
				>
					{actionLabel}
				</button>
			)}
		</li>
	)
}

export default BookingCard
