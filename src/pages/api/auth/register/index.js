import apiService from '@/utils/apiService'

const api = async (req, res) => {
	const { username, email, gender, password, confirm_password } = req.body
	switch (req.method) {
		case 'POST': {
			try {
				const result = await apiService.request({
					method: 'POST',
					url: '/auth/register',
					data: { username, email, gender, password, confirm_password }
				})
				const { data: _data, status } = result
				const { data, message } = _data
				return res.status(status).send({ message, data })
			} catch (error) {
				const {
					data: { message, errors },
					status
				} = error.response
				return res.status(status).send({ message, status, errors })
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
}
export default api
