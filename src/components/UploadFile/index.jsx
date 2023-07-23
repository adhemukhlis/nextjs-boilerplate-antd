import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
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

const MainUploadFile = ({
	maxSize = 2,
	allowDocFileType = ['application/pdf'],
	allowFileTypeLabel = [],
	urls = [],
	onReadyUpload,
	onChange,
	value
}) => {
	const [loading, setLoading] = useState(false)
	const [fileList, setFileList] = useState([])
	const handleRemove = () => {
		setFileList((prev) => prev.slice(0, prev.length - 1))
	}
	const beforeUpload = (file) => {
		const isAllowedFileType = allowDocFileType.includes(file.type)
		if (!isAllowedFileType) {
			messageError(`You can only upload ${allowFileTypeLabel.join('/')} file!`)
		}

		const isLt2M = file.size / 1024 / 1024 < maxSize
		if (!isLt2M) {
			messageError(`File must smaller than ${maxSize}MB!`)
		}
		return false
	}
	useEffect(() => {
		if (!!urls) {
			setLoading(false)
			const initState = !!value
				? [
						{
							uid: generateRandomKey(),
							name: `doc-agreement`,
							status: 'done',
							url: value
						}
				  ]
				: []
			setFileList(initState)
		}
	}, [value])
	const handleChange = ({ fileList: newFileList }) => {
		setLoading(true)
		if (newFileList.length !== 0) {
			const fileType = newFileList[newFileList.length - 1].type
			if ([...allowDocFileType].includes(fileType)) {
				onReadyUpload(newFileList[newFileList.length - 1].originFileObj)
					.then((url) => {
						onChange(url)
					})
					.finally(() => {
						setLoading(false)
					})
			} else {
				handleRemove()
			}
		}
	}
	return (
		<Upload multiple onChange={handleChange} fileList={fileList} beforeUpload={beforeUpload} onRemove={handleRemove}>
			<Button icon={<UploadOutlined />} loading={loading}>
				Upload
			</Button>
		</Upload>
	)
}
export default MainUploadFile
