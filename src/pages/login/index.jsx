import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Divider, Form, Input, Row, Typography, theme } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import MainCaptcha from '@/components/Captcha'
import ConditionalRender from '@/components/ConditionalRender'
import FormErrorPanel from '@/components/FormErrorPanel'
import asyncLocalStorage from '@/utils/async-local-storage'
import routeGuard from '@/utils/route-guard'
import getIronSessionHandler from '@/utils/session'

const { Title } = Typography

const LoginPage = () => {
	const [errors, setErrors] = useState([])
	const router = useRouter()
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const captchaRef = useRef(null)
	const verifiedCallback = (token) => {
		form.setFieldValue('captcha', token)
	}
	const {
		token: { colorBorder }
	} = theme.useToken()
	const handleSubmit = async (values) => {
		setErrors([])
		setIsLoading(true)
		const { email, password, remember_me, captcha } = values
		return await axios
			.request({
				method: 'post',
				url: '/api/auth/login',
				data: { email, password, captcha }
			})
			.then((res) => {
				setErrors([])
				if (res.status === 200) {
					if (!!remember_me) {
						asyncLocalStorage.setItem('_rm', email)
					} else {
						asyncLocalStorage.setItem('_rm', '')
					}
					router.push('/')
				}
			})
			.catch((err) => {
				formErrorHandler(err)
				setIsLoading(false)
				captchaRef.current.resetCaptcha()
				form.setFieldValue('captcha', undefined)
			})
	}
	const formErrorHandler = (error) => {
		const message = error?.response?.data?.message || ''
		const errors = error?.response?.data?.errors || []
		if (message) {
			setErrors((prev) => [...prev, { message, errors }])
		}
	}
	useEffect(() => {
		asyncLocalStorage.getItem('_rm').then((res) => {
			if (!!res) {
				form.setFieldValue('email', res)
				form.setFieldValue('remember_me', true)
			}
		})
	}, [])

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
									<Form.Item
										name="captcha"
										rules={[
											{
												required: true,
												message: 'please do captcha check'
											}
										]}>
										<MainCaptcha
											ref={captchaRef}
											create="/api/captcha/create"
											verify="/api/captcha/verify"
											callback={verifiedCallback}
										/>
									</Form.Item>
									<Form.Item>
										<Row justify="end" gutter={[24, 24]}>
											<Col span={24}>
												<Button block type="primary" htmlType="submit" loading={isLoading}>
													Login
												</Button>
											</Col>
											<ConditionalRender condition={errors.length > 0}>
												<Col span={24}>
													<FormErrorPanel errorData={errors} />
												</Col>
											</ConditionalRender>
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
export const getServerSideProps = async ({ req, res }) => {
	const session = await getIronSessionHandler(req, res)
	const accessToken = session?.auth?.accessToken
	const isLoggedOut = !accessToken
	const validator = [isLoggedOut]
	return routeGuard(validator, '/', {
		props: {}
	})
}
