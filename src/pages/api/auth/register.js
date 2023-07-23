import { SHA3, enc } from 'crypto-js'
import { withSessionRoute } from '@/utils/session-wrapper'
import { db } from '@/db/lowdbService'
import userValidator from '@/schemas/user'

export default withSessionRoute(async (req, res) => {
	const { username, email, gender, password, confirm_password, captcha, ...other } = req.body
	if (req.method === 'POST') {
		const [isUserValid, userInvalid] = userValidator({ username, email, gender, password, confirm_password, captcha })
		if (isUserValid) {
			if (captcha === req.session.captcha_token) {
				await db.read()
				const { users } = db.data
				if (users.filter((user) => user.email === email).length < 1) {
					const password_hash = SHA3(password).toString(enc.Hex)
					users.push({ username, email, gender, password: password_hash })
					await db.write()
				} else {
					res.status(403).send({ message: 'Already Exists', errors: ['Email sudah terdaftar!'] })
				}
				res.status(200).send({ message: `${email} registered successfully!` })
			} else {
				res
					.status(400)
					.send({ message: 'Invalid Captcha!', errors: ['Validasi Captcha tidak valid, mohon ulangi validasi captcha!'] })
			}
		} else {
			res.status(400).send({
				message: 'Bad Request',
				errors: userInvalid.map((err) => `${err.message} : ${JSON.stringify(err.params)}`)
			})
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
