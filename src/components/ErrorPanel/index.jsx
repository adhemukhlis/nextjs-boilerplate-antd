import { Alert } from 'antd'

const ErrorPanel = ({ errors = [] }) => {
	return (
		<>
			{errors.length > 0
				? errors.map((error, index) => {
						return (
							<Alert
								style={{ marginBottom: '1rem' }}
								key={index}
								message={'ERROR : ' + error.url}
								description={error.message}
								type="error"
								showIcon
								closable
							/>
						)
					})
				: null}
		</>
	)
}
export default ErrorPanel
