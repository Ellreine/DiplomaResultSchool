import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NavLink } from 'react-router-dom'

const RoomCard = ({
	room,
	handleBooking,
	isAuthenticated,
	isAdmin,
	handleChangeStatus,
	handleDeleteRoom,
}) => {
	const getSliderSettings = photosLength => ({
		dots: photosLength > 1,
		infinite: photosLength > 1,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 2000,
		arrows: photosLength > 1,
		swipe: photosLength > 1,
		draggable: photosLength > 1,
	})

	// Определение стиля статуса комнаты
	const statusStyle =
		room.status === 'available' ? 'text-green-500' : 'text-red-500'

	return (
		<li className='border rounded-lg p-4 shadow-md'>
			<NavLink to={`/rooms/${room._id}`} className='block hover:no-underline'>
				<h3 className='text-xl text-center font-semibold'>{`Room Number: ${room.name}`}</h3>
				<Slider {...getSliderSettings(room.photos.length)}>
					{room.photos.map((photo, index) => (
						<div
							key={index}
							className='flex justify-center items-center mt-2 max-w-full'
						>
							<img
								src={`http://localhost:3001${photo}`}
								alt={`Room ${room.name}`}
								className='max-h-[560px] object-cover rounded-md mx-auto'
							/>
						</div>
					))}
				</Slider>
				<p className='mt-8 mb-2'>{`Description: ${room.description}`}</p>

				<p className={`my-2 ${statusStyle}`}>{`Status: ${
					room.status.charAt(0).toUpperCase() + room.status.slice(1)
				}`}</p>
				<p className='my-2 font-bold'>{`Price: $${room.pricePerNight}/night`}</p>
			</NavLink>
			{isAdmin ? (
				<>
					<button
						onClick={() =>
							handleChangeStatus(
								room._id,
								room.status === 'available' ? 'booked' : 'available'
							)
						}
						className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Toggle Status
					</button>
					<button
						onClick={() => handleDeleteRoom(room._id)}
						className='mt-4 ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					>
						Delete Room
					</button>
				</>
			) : isAuthenticated && room.status === 'available' ? (
				<button
					onClick={() => handleBooking(room._id)}
					className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Book Now
				</button>
			) : (
				<button
					disabled
					className='mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50'
				>
					Booked
				</button>
			)}
		</li>
	)
}

export default RoomCard
