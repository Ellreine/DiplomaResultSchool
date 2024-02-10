import React from 'react'
import motelImage from '../assets/hotel920.jpg'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
	return (
		<div className='flex flex-col pt-10 min-h-screen h-full'>
			<div
				className='flex-grow bg-cover bg-center bg-no-repeat bg-fixed'
				style={{ backgroundImage: `url(${motelImage})` }}
			>
				<div className='mx-[10vw] pt-[12vh] min-h-[50vh] text-white flex justify-around flex-col items-center text-center'>
					<h1 className='text-4xl font-bold mb-4'>Welcome to Our Hotel</h1>
					<p className='text-lg mb-4'>
						Experience luxury and comfort in the heart of downtown. Our hotel
						<br />
						offers the perfect blend of elegance and modern amenities, making it
						<br />
						the ideal choice for both business and leisure travelers.
					</p>
					<p className='text-lg mb-4'>
						Enjoy our well-appointed rooms, gourmet dining options,
						<br />
						state-of-the-art fitness center, and serene spa services. Our
						<br />
						friendly and professional staff is dedicated to making your stay
						<br />
						unforgettable.
					</p>
					<p className='text-lg mb-10'>
						Book your stay with us today and discover the best in hospitality!
					</p>
					<NavLink to='/rooms'>
						<span className='bg-blue-900 px-8 py-4 text-2xl rounded-md font-semibold'>
							Check Rooms
						</span>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default HomePage
