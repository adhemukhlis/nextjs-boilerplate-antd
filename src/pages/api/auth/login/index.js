import apiService from '@/utils/apiService'
import { withSessionRoute } from '@/utils/sessionWrapper'

const api = withSessionRoute(async (req, res) => {
	const { email, password } = req.body
	switch (req.method) {
		case 'POST': {
			try {
				const result = await apiService.request({
					method: 'POST',
					url: '/auth/login',
					data: { email, password }
				})
				const { data: _data, status } = result
				const { data, message } = _data
				req.session.auth = {
					access_token: data.access_token
				}
				req.session.user = {
					email: data.email,
					username: data.username
				}
				await req.session.save()
				return res.status(status).send({ message })
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
})
export default api
