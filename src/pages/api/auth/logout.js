import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	if (req.method === 'POST') {
		try {
			await session.destroy()
			res.status(200).send({ message: 'Logged out!, redirecting to Login Page' })
		} catch (error) {
			res.status(error.response.status ?? 500).send(error.response.data, error.response.data ?? error)
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
}
export default api
