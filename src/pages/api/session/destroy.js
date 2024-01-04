import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	await session.destroy()
	res.status(200).json({ session })
}
export default api
