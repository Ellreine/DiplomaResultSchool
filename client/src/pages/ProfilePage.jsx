import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
	const { userInfo } = useSelector(state => state.user)

	return (
		<div className='flex flex-col pt-16 min-h-screen h-full px-4 md:px-8'>
			<h1 className='text-3xl font-semibold text-center mb-8'>Profile</h1>
			{userInfo ? (
				<div className='max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
					<div className='py-4 px-8'>
						<div className='text-center mb-8 flex flex-col gap-6'>
							<h2 className='text-2xl font-semibold text-gray-700'>
								{userInfo.username}
							</h2>
							<p className='text-xl text-gray-600'>Email: {userInfo.email}</p>
							<span className='text-gray-600'>Role: {userInfo.role}</span>
						</div>
					</div>
				</div>
			) : (
				<div className='flex justify-center items-center h-screen'>
					<p>Загрузка данных пользователя...</p>
				</div>
			)}
		</div>
	)
}

export default ProfilePage
