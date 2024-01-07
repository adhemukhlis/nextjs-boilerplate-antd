import apiService from '@/utils/newApiService'
const api = async (req, res) => {
	switch (req.method) {
		case 'GET': {
			try {
				const result = await apiService(req, res).request({
					method: 'GET',
					url: '/auth/me',
				})

				return res.status(200).send({ message: 'oke' })
			} catch (error) {
				// const {
				// 	data: { message, errors },
				// 	status
				// } = error.response
				// return res.status(status).send({ message, status, errors })
        console.log(error.response.status)
				return res.status(500).send({ message:'', status:500, errors:[] })
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
}
export default api
