/**
 *  const imgUrl = 'https://image.jpg'
 * 
 *  const handleUpload = (file) => {
			if (file !== undefined) {
				var bodyFormData = new FormData()
				bodyFormData.append('photo', file)
				ApiService.request({
					method: 'POST',
					url: API_URLS.PROFILE_CHANGE_PICTURE,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					},
					data: bodyFormData
				})
					.then((response) => {
						return response
					})
					.catch((error) => {
						throw error
					})
			}
		}
 *
 *  <UploadProfile onReadyUpload={handleUpload} imageUrl={imgUrl} /> 
 */

import { memo, useEffect, useState } from 'react'
import { Button, Modal, Upload, message } from 'antd'
import { CloseOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import useMediaQuery from 'use-media-antd-query'
import { isEqual } from 'lodash'
const modalSize = {
	xs: '90%',
	sm: '90%',
	md: '65%',
	lg: '65%',
	xl: '40%',
	xxl: '40%'
}
const allowImageFileType = ['image/jpeg', 'image/png', 'image/jpg', 'jpeg', 'jpg', 'png']
const allowVideoFileType = ['video/mp4', 'mp4']
function getUrlExtension(url) {
	return url.split(/[#?]/)[0].split('.').pop().trim()
}
const generateRandomKey = () => `${Math.floor(Math.random() * 1000000000)}`
export const messageError = (msg) => {
	const msgKey = generateRandomKey()
	message.error({
		key: msgKey,
		duration: 12,
		content: (
			<>
				{msg}
				<Button
					style={{ marginLeft: '0.6rem' }}
					size="small"
					type="text"
					icon={<CloseOutlined style={{ margin: 'auto' }} />}
					onClick={() => message.destroy(msgKey)}
				/>
			</>
		)
	})
}
const UploadImageMultiple = memo(
	({ maxSize = 2, aspect = 1, onReadyUpload, onChange, imageUrl = [], ...props }) => {
		const colSize = useMediaQuery()
		const [loading, setLoading] = useState(false)
		const [fileList, setFileList] = useState([])
		useEffect(() => {
			if ((imageUrl || []).length > 0) {
				setLoading(false)
				const initState = (imageUrl || []).map((imgUrl) => {
					const fileExtension = getUrlExtension(imgUrl.media_file)
					return {
						uid: generateRandomKey(),
						name: 'Photo',
						status: 'done',
						url: imgUrl.media_file,
						media_type: imgUrl.media_type,
						type: allowImageFileType.includes(fileExtension)
							? `image/${fileExtension}`
							: allowVideoFileType.includes(fileExtension)
							? `video/${fileExtension}`
							: fileExtension
					}
				})
				setFileList(initState)
			}
		}, [imageUrl])
		const getBase64 = (file) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result)
				reader.onerror = (error) => reject(error)
			})
		}
		const handleRemove = (file) => {
			if (!!file) {
				setFileList((prev) => {
					const removed = prev.filter((img) => img.url !== file.url)
					onChange(removed)
					return removed
				})
			} else {
				setFileList((prev) => {
					const removed = prev.slice(0, prev.length - 1)
					onChange(removed)
					return removed
				})
			}
		}
		const beforeUpload = (file) => {
			const isAllowedFileType = [...allowImageFileType, ...allowVideoFileType].includes(file.type)
			if (!isAllowedFileType) {
				handleRemove()
				messageError('You can only upload JPG/PNG/MP4 file!')
			}

			const isLt2M = file.size / 1024 / 1024 < maxSize
			if (!isLt2M) {
				handleRemove()
				messageError(`File must smaller than ${maxSize}MB!`)
			}
			return false
		}
		const handlePreview = async (file) => {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj)
			}
			Modal.info({
				title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
				centered: true,
				width: modalSize[colSize],
				footer: null,
				icon: null,
				closable: true,
				content: (
					<img
						alt="example"
						style={{
							width: '100%'
						}}
						src={file.url || file.preview}
					/>
				)
			})
		}
		const handleChange = async ({ fileList: newFileList }) => {
			if ('originFileObj' in newFileList[newFileList.length - 1]) {
				const fileType = newFileList[newFileList.length - 1].type
				if ([...allowImageFileType, ...allowVideoFileType].includes(fileType)) {
					setLoading(true)
					onReadyUpload(
						newFileList[newFileList.length - 1].originFileObj,
						allowVideoFileType.includes(fileType) ? 'vid' : allowImageFileType.includes(fileType) ? 'img' : fileType
					)
						.then((url) => {
							setFileList((prev) => {
								const newFiles = [
									...prev,
									{
										uid: generateRandomKey(),
										name: 'Photo',
										status: 'done',
										url: url
									}
								]
								onChange(
									newFiles.map((item) => {
										const fileExtension = getUrlExtension(item.url)
										return {
											url: item.url,
											media_type: allowImageFileType.includes(fileExtension)
												? `img`
												: allowVideoFileType.includes(fileExtension)
												? `vid`
												: fileExtension
										}
									})
								)
								return newFiles
							})
						})
						.finally(() => {
							setLoading(false)
						})
				} else {
					handleRemove()
				}
			}
		}

		const UploadButton = () => (
			<div>
				{loading ? (
					<LoadingOutlined
						style={{
							fontSize: 28,
							color: 'rgba(0,0,0,0.85)'
						}}
					/>
				) : (
					<UploadOutlined
						style={{
							fontSize: 28,
							color: 'rgba(0,0,0,0.85)'
						}}
					/>
				)}
				<div
					style={{
						marginTop: 8,
						color: 'rgba(0,0,0,0.85)'
					}}>
					Upload
				</div>
			</div>
		)
		return (
			<>
				<Upload
					loading
					name="image-file"
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					beforeUpload={beforeUpload}
					onChange={handleChange}
					onRemove={handleRemove}>
					<UploadButton />
				</Upload>
			</>
		)
	},
	(prevProps, nextProps) => !['imageUrl'].map((item) => isEqual(prevProps[item], nextProps[item])).includes(false)
)

export default UploadImageMultiple
