import dayjs from 'dayjs'
import { db } from '@/db/lowdbService'
import sleep from '@/utils/sleep'
import credentialValidator from '@/validator/credential'

const mock = async (req, res) => {
	const { email, password } = req.body
	switch (req.method) {
		case 'POST': {
			await sleep(2400)
			const [isValid, invalidList] = credentialValidator({ email, password })
			if (isValid) {
				await db.read()
				const { users } = db.data
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
							accessToken: `access-token-${unix}`,
							expiredAt: expiredAt.toISOString()
						}
					})
				} else {
					return res.status(401).json({ message: 'incorrect credential!' })
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
