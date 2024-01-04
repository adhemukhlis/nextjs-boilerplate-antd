import apiService from '@/utils/apiService'
import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	const token = session?.auth?.accessToken
	if (req.method === 'POST') {
		try {
			const response = await apiService.request({
				method: 'post',
				url: `/api/v1/menuPermission/updateMenu`,
				data: req.body,
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			res.status(200).send(response.data)
		} catch (error) {
			res.status(error.response.status ?? 500).send(error.response.data ?? error)
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
}
export default api
