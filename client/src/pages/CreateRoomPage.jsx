import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom } from '../redux/slices/roomSlice'
import { useNavigate } from 'react-router-dom'
import { fetchRooms } from '../redux/slices/roomSlice'

const CreateRoomPage = () => {
	const [roomDetails, setRoomDetails] = useState({
		name: '',
		capacity: '',
		pricePerNight: '',
		description: '',
		status: 'available',
	})
	const [photos, setPhotos] = useState([])
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const fileInputRef = useRef(null)
	const { needUpdate } = useSelector(state => state.rooms)

	useEffect(() => {
		dispatch(fetchRooms())
	}, [dispatch, needUpdate])

	const handleChange = e => {
		setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value })
	}

	const handleFileChange = e => {
		setPhotos([...e.target.files])
	}

	const handleSubmit = e => {
		e.preventDefault()

		const formData = new FormData()
		for (const key in roomDetails) {
			formData.append(key, roomDetails[key])
		}
		photos.forEach(photo => {
			formData.append('photos', photo)
		})

		dispatch(createRoom(formData))
		navigate('/admin-panel')
	}

	return (
		<div className='container mx-auto px-4 py-20 min-h-screen h-full'>
			<div className='bg-gray-300/80 backdrop-blur-xl p-10 mt-10 mx-auto max-w-md w-full rounded-xl shadow-xl flex flex-col justify-around gap-8'>
				<h2 className='mx-auto text-2xl'>Create New Room</h2>
				<form
					onSubmit={handleSubmit}
					className='text-md flex flex-col gap-6'
					encType='multipart/form-data'
				>
					{/* Name */}
					<div>
						<label className='block font-medium text-gray-700'>Name:</label>
						<input
							name='name'
							value={roomDetails.name}
							onChange={handleChange}
							required
							className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-3'
						/>
					</div>
					{/* Capacity */}
					<div>
						<label className='block font-medium text-gray-700'>Capacity:</label>
						<input
							type='number'
							name='capacity'
							value={roomDetails.capacity}
							onChange={handleChange}
							required
							className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-3'
						/>
					</div>
					{/* Price Per Night */}
					<div>
						<label className='block font-medium text-gray-700'>
							Price per Night:
						</label>
						<input
							type='number'
							name='pricePerNight'
							value={roomDetails.pricePerNight}
							onChange={handleChange}
							required
							className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-3'
						/>
					</div>
					{/* Description */}
					<div>
						<label className='block font-medium text-gray-700'>
							Description:
						</label>
						<textarea
							name='description'
							value={roomDetails.description}
							onChange={handleChange}
							required
							className='border-gray-300 w-full rounded-md focus:border-blue-700 focus:ring-blue-700 pl-3'
						/>
					</div>
					{/* Photos */}
					<div className='block font-medium text-gray-700'>
						<label
							htmlFor='photo-upload'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
						>
							Upload Photos
						</label>
						<input
							id='photo-upload'
							type='file'
							multiple
							ref={fileInputRef}
							onChange={handleFileChange}
							className='hidden'
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='bg-green-600 p-2 font-semibold rounded-md self-center text-white'
					>
						Create Room
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateRoomPage
