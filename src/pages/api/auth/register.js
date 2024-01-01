import apiService from '@/utils/apiService'
import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(async (req, res) => {
	const { username, email, gender, password, confirm_password, captcha, ...other } = req.body
	switch (req.method) {
		case 'POST': {
			if (captcha === req.session.captcha_token) {
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
			} else {
				return res
					.status(400)
					.send({ message: 'Invalid Captcha!', errors: ['Validasi Captcha tidak valid, mohon ulangi validasi captcha!'] })
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
})
