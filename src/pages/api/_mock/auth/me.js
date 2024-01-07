const api = async (req, res) => {
	switch (req.method) {
		case 'GET': {
			console.log('mock-me', req.headers['authorization'])
			if (req.headers['authorization'] === 'Bearer 000-access-token-000') {
				return res.status(200).send({ message: 'oke' })
			} else {
				return res.status(401).send({ message: 'expired token' })
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
}
export default api
