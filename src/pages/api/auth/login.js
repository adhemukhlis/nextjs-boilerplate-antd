import apiService from '@/utils/apiService'
import getIronSessionHandler from '@/utils/session'
const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	const { email, password, captcha } = req.body
	switch (req.method) {
		case 'POST': {
			if (captcha === session.captcha_token) {
				try {
					const result = await apiService.request({
						method: 'POST',
						url: '/auth/login',
						data: { email, password }
					})
					const { data: _data, status } = result
					const { data, message } = _data
					session.auth = {
						email,
						accessToken: data.accessToken
					}
					await session.save()
					return res.status(status).send({ message })
				} catch (error) {
					const {
						data: { message, errors },
						status
					} = error.response
					return res.status(status).send({ message, status, errors })
				}
			} else {
				return res
					.status(400)
					.send({ message: 'Invalid Captcha!', errors: ['Captcha validation is invalid, please retry captcha validation!'] })
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
}
export default api
