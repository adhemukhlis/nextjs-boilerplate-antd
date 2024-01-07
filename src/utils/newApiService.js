import axios from 'axios'
import getIronSessionHandler from './session'

const apiService = axios.create({
	baseURL: process.env.NEXT_BACKEND_API_HOST,
	timeout: 60000
})
const refreshAccessToken = async () => {
	return await new Promise((resolve) => {
		setTimeout(() => {
			const myObject = { accessToken: '000-access-token-000' }
			resolve(myObject)
		}, 2400)
	})
}
const apiInstance = (req, res) => {
	apiService.interceptors.request.use(
		async (config) => {
			const session = await getIronSessionHandler(req, res)
			console.log('session-service', session)
			console.log('config', config.headers)
			config.headers = {
				Authorization: `Bearer ${session.auth.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			return config
		},
		(error) => {
			Promise.reject(error)
		}
	)
	apiService.interceptors.response.use(
		(response) => {
			return response
		},
		async function (error) {
			const originalRequest = error.config
			const session = await getIronSessionHandler(req, res)
      const currentAccessToken = session?.auth?.accessToken

			if (error.response.status === 401 && !originalRequest._retry && !!currentAccessToken) {
        const data = await refreshAccessToken()
        const accessToken = data?.accessToken
        session.auth = {
          accessToken
        }
        await session.save()
				originalRequest._retry = true
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
				return apiService(originalRequest)
			}
			return Promise.reject(error)
		}
	)
	return apiService
}
export default apiInstance
