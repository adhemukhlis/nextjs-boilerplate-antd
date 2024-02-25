import { Alert, Button, Col, Modal } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import ConditionalRender from '../ConditionalRender'

const FormErrorPanel = forwardRef(({ style: _style }, ref) => {
	const [errorsValidation, setErrorsValidation] = useState([])
	const [modal, contextHolder] = Modal.useModal()
	useImperativeHandle(ref, () => ({
		clearErrors() {
			setErrorsValidation([])
		},
		setError({ message, errors }) {
			setErrorsValidation((prev) => [...prev, { message, errors }])
		}
	}))
	const handleShowDetail = (errors) => {
		modal.error({
			title: 'Error Detail',
			closable: true,
			maskClosable: true,
			okButtonProps: { style: { display: 'none' } },
			content: (
				<ul>
					{(errors || []).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)
		})
	}
	return (
		<ConditionalRender condition={errorsValidation.length > 0}>
			<Col span={24}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					{errorsValidation.length > 0 ? (
						errorsValidation.map((error, index) => {
							return (
								<Alert
									key={index}
									message={error.message}
									type="error"
									showIcon
									closable
									onClose={() => {
										setTimeout(() => setErrorsValidation((prev) => prev.filter((_val, _index) => _index !== index)), 600)
									}}
									{...((error.errors || []).length > 0
										? {
												action: (
													<Button size="small" type="text" onClick={() => handleShowDetail(error.errors)}>
														Detail
													</Button>
												)
											}
										: {})}
								/>
							)
						})
					) : (
						<></>
					)}
					{contextHolder}
				</div>
			</Col>
		</ConditionalRender>
	)
})
export default FormErrorPanel
