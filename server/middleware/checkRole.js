const checkRole = role => {
	return (req, res, next) => {
		if (!req.user || req.user.role !== role) {
			return res.status(403).send('Access Denied')
		}
		console.log(req.user.role)
		next()
	}
}

module.exports = checkRole
