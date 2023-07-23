import { instance } from '../api-instance'
import apiService from '@/utils/apiService'

export const getListGallery = async (query) =>
	await apiService
		.request({
			method: 'get',
			url: '/api/v1/gallery/list',
			params: query
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})

export const createGallery = async (
	// token,
	requestBody
) =>
	await instance
		.request({
			method: 'post',
			url: '/gallery/add',
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

export const getGalleryDetail = async (
	// token,
	galleryTypeID
) =>
	await instance
		.request({
			method: 'get',
			url: '/gallery/masterTipe/detail/' + galleryTypeID
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

export const updateGallery = async (
	// token,
	galleryTypeID,
	requestBody
) =>
	await instance
		.request({
			method: 'post',
			url: '/gallery/masterTipe/update/' + galleryTypeID,
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

export const detailGallery = async (gallery_id) =>
	await instance
		.request({
			method: 'get',
			url: '/api/v1/gallery/detail/' + gallery_id
			// headers: {
			//     'Authorization': `Bearer ${token}`
			// }
		})
		.then((res) => res)
		.catch((err) => {
			throw err
		})
