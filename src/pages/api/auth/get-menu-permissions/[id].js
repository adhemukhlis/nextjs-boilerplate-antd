import { get } from 'lodash'
import apiService from '@/utils/apiService'
import ssrCache from '@/utils/cache'
const api = async (req, res) => {
	const id = get(req, 'query.id', '')
	const forceUpdate = get(req, 'query.force', false) === 'true'
	if (req.method === 'GET') {
		try {
			if (ssrCache.has(id) && !forceUpdate) {
				res.status(200).send({ data: { from: 'lru', ...ssrCache.get(id) } })
			} else {
				const response = await apiService.request({
					method: 'get',
					url: '/api/v1/menuPermission/permissionByRole',
					params: { id }
				})
				ssrCache.set(id, response?.data?.data || [])
				res.status(200).send({ data: { from: 'api', ...(response?.data?.data || {}) } })
			}
		} catch (error) {
			res.status(error.response.status ?? 500).send(error.response.data ?? error)
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
}
export default api
