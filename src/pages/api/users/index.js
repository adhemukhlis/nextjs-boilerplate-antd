import { withSessionRoute } from '@/utils/session-wrapper'
import { db } from '@/db/lowdbService'

export default withSessionRoute(async (req, res) => {
	const token = req.session?.auth?.access_token
	if (req.method === 'GET') {
		await db.read()
		const { users, sessionLogin } = db.data
		const sessionIndex = sessionLogin.findIndex((item) => item.access_token === token)
		if (sessionIndex > -1) {
			const response = {
				data: users.map(({ username, email, gender }) => ({ username, email, gender }))
			}
			res.status(200).send(response.data)
		} else {
			res.status(401).send({ message: 'Invalid Token!' })
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
