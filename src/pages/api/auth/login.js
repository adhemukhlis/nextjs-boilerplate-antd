import dayjs from 'dayjs'
import { SHA3, enc } from 'crypto-js'
import { withSessionRoute } from '@/utils/session-wrapper'
import { db } from '@/db/lowdbService'
import randomStringGenerator from '@/utils/random-string-generator'

export default withSessionRoute(async (req, res) => {
	const { email, password, captcha } = req.body
	if (req.method === 'POST') {
		if (captcha === req.session.captcha_token) {
			await db.read()
			const { users } = db.data
			const password_hash = SHA3(password).toString(enc.Hex)
			const userByEmail = users.filter((user) => user.email === email && user.password === password_hash)
			if (userByEmail.length > 0) {
				const { sessionLogin } = db.data
				const sessionIndex = sessionLogin.findIndex((item) => item.email === email)
				const generated_token = randomStringGenerator()
				if (sessionIndex === -1) {
					sessionLogin.push({ email, access_token: generated_token })
					await db.write()
				} else {
					sessionLogin[sessionIndex] = {
						email,
						access_token: generated_token,
						expired_at: dayjs().add(7, 'day').toISOString()
					}
					await db.write()
				}
				req.session.auth = {
					username: userByEmail[0].username,
					email: userByEmail[0].email,
					access_token: generated_token
				}
				await req.session.save()
				res.status(200).send(userByEmail)
			} else {
				res.status(400).send({ message: 'User not found', errors: ['Email atau password salah!'] })
			}
		} else {
			res
				.status(400)
				.send({ message: 'Invalid Captcha!', errors: ['Validasi Captcha tidak valid, mohon ulangi validasi captcha!'] })
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
