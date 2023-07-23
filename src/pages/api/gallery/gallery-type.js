import { instance } from '../api-instance'

export const getListGalleryType = async (
	access_token,
	{ page = 1, per_page = 10 }
) =>
	await instance
		.request({
			method: 'get',
			url: '/api/v1/gallery/masterTipe/list',
			params: {
				page: page,
				per_page: per_page
			},
			headers: {
			    'Authorization': `Bearer ${access_token}`
			}
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})

export const getAllMasterGalleryType = async (access_token) =>
	// token,
	await instance
		.request({
			method: 'get',
			url: '/api/v1/gallery/masterTipe',
			headers: {
			    'Authorization': `Bearer ${access_token}`
			}
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})

// export const createGalleryType = async (
// 	// token,
// 	requestBody
// ) =>
// 	await instance
// 		.request({
// 			method: 'post',
// 			url: '/api/v1/gallery/masterTipe',
// 			data: requestBody
// 			// headers: {
// 			//     'Authorization': `Bearer ${token}`
// 			// }
// 		})
// 		.then((res) => {
// 			return res
// 		})
// 		.catch((err) => {
// 			throw err
// 		})

export const updateGalleryType = async (
	// token,
	galleryTypeID,
	requestBody
) =>
	await instance
		.request({
			method: 'post',
			url: '/api/v1/gallery/masterTipe/update/' + galleryTypeID,
			data: requestBody
			// headers: {
			//     'Authorization': `Bearer ${token}`
			// }
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})
