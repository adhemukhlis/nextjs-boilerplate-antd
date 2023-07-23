import { Button, Popconfirm } from 'antd'
import React, { useState } from 'react'
const MainButtonDelete = ({
	disabled,
	title = 'Title',
	description = 'Open Popconfirm with async logic',
	onConfirm
}) => {
	const [open, setOpen] = useState(false)
	const showConfirm = () => {
		setOpen(true)
	}
	const handleOk = () =>
		new Promise((resolve) => {
			onConfirm().finally(() => {
				resolve(null)
				setOpen(false)
			})
		})
	const handleCancel = () => {
		setOpen(false)
	}
	return (
		<Popconfirm
			title={title}
			description={description}
			open={open}
			onConfirm={handleOk}
			okButtonProps={{
				disabled: disabled
			}}
			cancelButtonProps={{
				disabled: disabled
			}}
			onCancel={handleCancel}>
			<Button danger onClick={showConfirm} disabled={disabled}>
				Delete
			</Button>
		</Popconfirm>
	)
}
export default MainButtonDelete
