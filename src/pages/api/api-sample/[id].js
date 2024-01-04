const api = async (req, res) => {
	if (req.method === 'GET') {
		try {
			res.status(200).send(req.query)
		} catch (error) {
			res.status(error.response.status ?? 500).send(error.response.data ?? error)
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
}
export default api
