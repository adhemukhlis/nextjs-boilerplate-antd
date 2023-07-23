import apiService from '@/utils/apiService'

export const getAllListArea = async () =>
	await apiService
		.request({
			method: 'get',
			url: '/api/v1/area'
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})
