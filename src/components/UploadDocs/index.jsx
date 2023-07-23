import { useEffect, useState } from 'react'
import { Button, Modal, Upload, message } from 'antd'
import { CloseOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import useMediaQuery from 'use-media-antd-query'
const modalSize = {
	xs: '90%',
	sm: '90%',
	md: '65%',
	lg: '65%',
	xl: '40%',
	xxl: '40%'
}
const allowFileType = ['application/pdf']
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
const UploadDocs = ({ maxSize = 2, aspect = 1, onReadyUpload, imageUrl, ...props }) => {
	const colSize = useMediaQuery()
	const [loading, setLoading] = useState(false)
	const [fileList, setFileList] = useState([])
	useEffect(() => {
		if (!!imageUrl) {
			setLoading(false)
			const initState = [
				{
					uid: generateRandomKey(),
					name: 'Docs',
					status: 'done',
					url: imageUrl
				}
			]
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
	const handleRemove = () => {
		setFileList([])
		onReadyUpload(undefined)
	}
	const beforeUpload = (file) => {
		const isJpgOrPng = allowFileType.includes(file.type)
		if (!isJpgOrPng) {
			handleRemove()
			messageError('You can only upload JPG/PNG file!')
		}

		const isLt2M = file.size / 1024 / 1024 < maxSize
		if (!isLt2M) {
			handleRemove()
			messageError(`Image must smaller than ${maxSize}MB!`)
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
		if (newFileList.length !== 0) {
			if (allowFileType.includes(newFileList[0].type)) {
				setLoading(true)
				onReadyUpload(newFileList[0].originFileObj)
			} else {
				handleRemove()
			}
		}
	}

	const uploadButton = (
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
				{fileList.length === 0 && uploadButton}
			</Upload>
		</>
	)
}

export default UploadDocs
