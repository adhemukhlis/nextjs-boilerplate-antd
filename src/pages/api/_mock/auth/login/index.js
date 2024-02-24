import dayjs from 'dayjs'
import globalStore from '@/utils/globalStore'
import sleep from '@/utils/sleep'
import credentialValidator from '@/validator/credential'

const mock = async (req, res) => {
	const { email, password } = req.body
	switch (req.method) {
		case 'POST': {
			await sleep(2400)
			const [isValid, invalidList] = credentialValidator({ email, password })
			if (isValid) {
				const users = globalStore.get('users')
				const user = users.filter((user) => user.email === email && user.password === password)
				if (user.length > 0) {
					const dateNow = dayjs().format('YYYY-MM-DD')
					const currentHour = dayjs().get('hour')
					const round = currentHour + (8 - (currentHour % 8))
					const expiredAt = dayjs(dateNow).add(round, 'h').subtract(1, 'second')
					const unix = expiredAt.valueOf()
					return res.status(200).json({
						message: 'login success',
						data: {
							username: user[0].username,
							email: user[0].email,
							access_token: `access-token-${unix}`,
							expired_at: expiredAt.toISOString()
						}
					})
				} else {
					return res
						.status(401)
						.json({ message: 'Incorrect Credential!', errors: ['The email or password you entered is incorrect'] })
				}
			} else {
				return res.status(400).send({
					message: 'Bad Request',
					errors: invalidList.map((err) => `'${err.instancePath.split('/').pop()}' ${err.message}`)
				})
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
}
export default mock
