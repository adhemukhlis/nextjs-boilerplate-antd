import { ENCRYPTION_KEY } from '@/configs/keys'
import apiService from '@/utils/apiService'
import { hexDecrypt } from '@/utils/hexCipher'
import { withSessionRoute } from '@/utils/sessionWrapper'

const api = withSessionRoute(async (req, res) => {
	const { email, password } = req.body
	const decryptedPassword = hexDecrypt(password, ENCRYPTION_KEY)
	switch (req.method) {
		case 'POST': {
			try {
				const result = await apiService.request({
					method: 'POST',
					url: '/auth/login',
					data: { email, password: decryptedPassword }
				})
				const { data: _data, status } = result
				const { data, message } = _data
				req.session.auth = {
					access_token: data.access_token
				}
				req.session.user = {
					email: data.email,
					username: data.username,
					profile_picture: data.profile_picture
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
