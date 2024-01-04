import { CloseOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message } from 'antd'
import { useState } from 'react'
import styledComponents from 'styled-components'
const allowImageFileType = ['image/jpeg', 'image/png', 'image/jpg', 'jpeg', 'jpg', 'png']
const allowVideoFileType = ['video/mp4', 'mp4']
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
const UploadButton = styledComponents(({ maxSize = 2, aspect = 1, onReadyUpload, onChange, value, ...props }) => {
	const [loading, setLoading] = useState(false)

	const beforeUpload = (file) => {
		const isAllowedFileType = [...allowImageFileType, ...allowVideoFileType].includes(file.type)
		if (!isAllowedFileType) {
			messageError('You can only upload JPG/PNG/MP4 file!')
		}

		const isLt2M = file.size / 1024 / 1024 < allowImageFileType.includes(file.type) ? 2 : 200
		if (!isLt2M) {
			messageError(`File must smaller than ${allowImageFileType.includes(file.type) ? 2 : 200}MB!`)
		}
		return false
	}

	const handleChange = async ({ fileList: newFileList }) => {
		if (newFileList.length !== 0) {
			const fileType = newFileList[newFileList.length - 1].type
			if ([...allowImageFileType, ...allowVideoFileType].includes(fileType)) {
				setLoading(true)
				onReadyUpload(newFileList[newFileList.length - 1].originFileObj)
					.then((url) => {
						onChange({
							media_file: url,
							media_type: allowVideoFileType.includes(fileType)
								? 'vid'
								: allowImageFileType.includes(fileType)
									? 'img'
									: fileType
						})
					})
					.finally(() => {
						setLoading(false)
					})
			}
		}
	}

	const UploadButtonIcon = () => (
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
			<Upload listType="picture-card" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange}>
				<UploadButtonIcon />
			</Upload>
		</>
	)
})`
.ant-upload.ant-upload-select {
	margin: 1rem;
}

`

export default UploadButton
