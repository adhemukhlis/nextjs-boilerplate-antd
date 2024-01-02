import { db } from '@/db/lowdbService'
import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(async (req, res) => {
	const token = req.session?.auth?.accessToken
	if (req.method === 'GET') {
		await db.read()
		const { users, sessionLogin } = db.data
		const sessionIndex = sessionLogin.findIndex((item) => item.accessToken === token)
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
