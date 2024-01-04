import { db } from '@/db/lowdbService'
import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	const token = session?.auth?.accessToken
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
}
export default api
