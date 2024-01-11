import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Divider, Form, Input, Row, Typography, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'
import { useState } from 'react'
import isEmpty from '@/utils/is-empty'

const { Title } = Typography

const LoginPage = ({ session }) => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	console.log(session)
	const {
		token: { colorBorder }
	} = theme.useToken()
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { email, password, remember_me } = values
		await signIn('credentials', {
			redirect: false,
			email,
			password
		})
			.then((response) => {
				console.log(response)
				router.replace('/')
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	// useEffect(() => {
	// 	asyncLocalStorage.getItem('_rm').then((res) => {
	// 		if (!!res) {
	// 			form.setFieldValue('email', res)
	// 			form.setFieldValue('remember_me', true)
	// 		}
	// 	})
	// }, [])

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
									padding: '0 2rem 0 2rem',
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<Image src="/_assets/images/logo.png" width={100} height={100} alt="logo" />
								<Title level={3}>Login</Title>
								<Form
									size="large"
									form={form}
									onFinish={handleSubmit}
									autoComplete="off"
									layout="vertical"
									colon={false}
									style={{
										width: '100%'
									}}>
									<Form.Item
										name="email"
										rules={[
											{
												required: true,
												type: 'email',
												message: 'Please input your email!'
											}
										]}>
										<Input placeholder="Email" prefix={<MailOutlined style={{ color: colorBorder }} />} />
									</Form.Item>
									<Form.Item
										name="password"
										rules={[
											{
												required: true,
												message: 'Please input your password!'
											}
										]}>
										<Input.Password placeholder="Password" prefix={<LockOutlined style={{ color: colorBorder }} />} />
									</Form.Item>
									<Form.Item name="remember_me" valuePropName="checked">
										<Checkbox>Remember me</Checkbox>
									</Form.Item>
									<Form.Item>
										<Row justify="end" gutter={[24, 24]}>
											<Col span={24}>
												<Button block type="primary" htmlType="submit" loading={isLoading}>
													Login
												</Button>
											</Col>
											<Col>
												<Link href="/forgot-password">Forgot password</Link>
											</Col>
										</Row>
										<Row>
											<Col span={24}>
												<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
													<Divider>or</Divider>
													<Link href="/register">Create Account</Link>
												</div>
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

export default LoginPage
export const getServerSideProps = async ({ req }) => {
	const session = await getSession({ req: req })
	if (!isEmpty(session?.auth?.accessToken)) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: { session }
	}
}
