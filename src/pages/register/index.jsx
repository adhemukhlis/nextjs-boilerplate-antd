import { Button, Card, Col, Form, Input, Row, Segmented, Space, Tooltip, message, Typography } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import errorModal from '@/utils/errorModal'
import isEmpty from '@/utils/isEmpty'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'

const { Title } = Typography
const RegisterPage = () => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { username, email, gender, password, confirm_password } = values
		return await axios
			.request({
				method: 'post',
				url: '/api/auth/register',
				data: { username, email, gender, password, confirm_password }
			})
			.then((res) => {
				if (res.status === 201) {
					message.open({
						key: 'register-success-message',
						type: 'success',
						content: (
							<Space>
								{res.data.message}
								<Button
									type="primary"
									onClick={() => {
										message.destroy('register-success-message')
										router.replace('/login')
									}}>
									Login Now!
								</Button>
							</Space>
						),
						duration: 6
					})
					form.resetFields()
				}
			})
			.catch((err) => {
				errorModal(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					overflowX: 'auto',
					overflowY: 'auto'
				}}>
				<Row justify="center" align="middle" style={{ flex: 1 }}>
					<Col {...{ xxl: 8, xl: 8, lg: 10, md: 12, sm: 16, xs: 22 }}>
						<Card>
							<div
								style={{
									margin: '2rem 0 2rem 0',
									padding: '0 2rem 0 2rem',
									display: 'flex',
									gap: '2rem',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<Image src="/_assets/images/logo.png" width={100} height={100} alt="logo" />
								<Title level={3}>Register</Title>
								<Form
									form={form}
									style={{
										width: '100%'
									}}
									initialValues={{ gender: 'male' }}
									onFinish={handleSubmit}
									autoComplete="off"
									layout="vertical"
									colon={false}>
									<Form.Item
										label="Username"
										name="username"
										rules={[
											{
												required: true,
												type: 'string',
												max: 16,
												min: 4
											}
										]}>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name="email"
										rules={[
											{
												required: true,
												type: 'email',
												message: 'Please input your email!'
											}
										]}>
										<Input />
									</Form.Item>
									<Form.Item
										label="Gender"
										name="gender"
										rules={[
											{
												required: true
											}
										]}>
										<Segmented
											block
											options={[
												{ label: 'Female', value: 'female' },
												{ label: 'Male', value: 'male' },
												{
													label: (
														<Tooltip placement="bottomRight" title="ignore this, it's just a bug">
															Non-binary
														</Tooltip>
													),
													value: 'undefined',
													disabled: true
												}
											]}
										/>
									</Form.Item>
									<Form.Item
										label="Password"
										name="password"
										rules={[
											{
												required: true,
												message: 'Please input your password!'
											}
										]}>
										<Input.Password />
									</Form.Item>
									<Form.Item
										name="confirm_password"
										label="Confirm Password"
										dependencies={['password']}
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please confirm your password!'
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (!value || getFieldValue('password') === value) {
														return Promise.resolve()
													}
													return Promise.reject(new Error('The two passwords that you entered do not match!'))
												}
											})
										]}>
										<Input.Password />
									</Form.Item>
									<Form.Item>
										<Row justify="space-between">
											<Col>
												<Button type="primary" htmlType="submit" loading={isLoading}>
													Register Now!
												</Button>
											</Col>
											<Col>
												<Link href="/login">I already have an account</Link>
											</Col>
										</Row>
									</Form.Item>
								</Form>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default RegisterPage

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedOut = isEmpty(accessToken)
	const validator = [isLoggedOut]
	return routeGuard(validator, '/', {
		props: {}
	})
})
