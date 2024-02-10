import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '../redux/slices/roomSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RoomDetailsPage = () => {
	const { roomId } = useParams()
	const { rooms, status } = useSelector(state => state.rooms)
	const dispatch = useDispatch()

	useEffect(() => {
		if (rooms.length === 0) {
			dispatch(fetchRooms())
		}
	}, [dispatch, rooms.length])

	// Находим детали комнаты по ID из уже загруженного списка комнат
	const roomDetails = rooms.find(room => room._id === roomId)

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

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (!roomDetails) {
		return <div>Room not found.</div>
	}

	return (
		<div className='container mx-auto p-4 my-10'>
			<div className='border rounded-lg p-4 shadow-md'>
				<h2 className='text-xl text-center font-semibold mb-4'>{`Room Number: ${roomDetails.name}`}</h2>
				<Slider {...getSliderSettings(roomDetails.photos.length)}>
					{roomDetails.photos.map((photo, index) => (
						<div key={index} className='flex justify-center items-center'>
							<img
								src={`http://localhost:3001${photo}`}
								alt={`Room ${roomDetails.name}`}
								className='max-h-[560px] object-cover rounded-md mx-auto'
							/>
						</div>
					))}
				</Slider>
				<div className='my-4'>
					<p className='mt-4'>
						<strong>Description:</strong> {roomDetails.description}
					</p>
					<p className='mt-2'>
						<strong>Price per Night:</strong> ${roomDetails.pricePerNight}
					</p>
					<p className='mt-2'>
						<strong>Status:</strong> {roomDetails.status}
					</p>
					<p className='mt-2'>
						<strong>Capacity:</strong> {roomDetails.capacity} persons
					</p>
				</div>
			</div>
		</div>
	)
}

export default RoomDetailsPage
