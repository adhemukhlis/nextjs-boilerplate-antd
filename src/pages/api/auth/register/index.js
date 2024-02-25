import { ENCRYPTION_KEY } from '@/configs/keys'
import apiService from '@/utils/apiService'
import { hexDecrypt } from '@/utils/hexCipher'

const api = async (req, res) => {
	const { username, email, gender, password, confirm_password } = req.body
	const decryptedPassword = hexDecrypt(password, ENCRYPTION_KEY)
	const decryptedConfirmPassword = hexDecrypt(confirm_password, ENCRYPTION_KEY)

	switch (req.method) {
		case 'POST': {
			try {
				const result = await apiService.request({
					method: 'POST',
					url: '/auth/register',
					data: { username, email, gender, password: decryptedPassword, confirm_password: decryptedConfirmPassword }
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
