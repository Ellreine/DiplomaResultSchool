import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { userInfo } = useSelector(state => state.user)
	const location = useLocation()

	// Проверяем, входит ли роль пользователя в список разрешённых ролей
	const hasAccess = userInfo && allowedRoles.includes(userInfo.role)

	if (!hasAccess) {
		// Если у пользователя нет доступа, перенаправляем его на главную страницу или страницу входа
		return <Navigate to='/' replace state={{ from: location }} />
	}

	return children
}

export default ProtectedRoute
