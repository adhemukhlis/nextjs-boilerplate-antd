import { db } from '@/db/lowdbService'
import sleep from '@/utils/sleep'
import registerValidator from '@/validator/register'

const mock = async (req, res) => {
	const { username, email, gender, password, confirm_password } = req.body
	switch (req.method) {
		case 'POST': {
			await sleep(2400)
			const [isValid, invalidList] = registerValidator({ username, email, gender, password, confirm_password })
			if (isValid) {
				await db.read()
				const { users } = db.data
				if (users.filter((user) => user.email === email).length < 1) {
					users.push({ username, email, gender, password })
					await db.write()
					return res.status(201).json({
						message: `${email} registered successfully!`,
						data: {
							email,
							username
						}
					})
				} else {
					return res.status(409).send({ message: 'Already Exists', errors: ['Email sudah terdaftar!'] })
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
