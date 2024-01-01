import { Button, Card, Checkbox, Col, Divider, Form, Input, Row, Typography } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import MainCaptcha from '@/components/Captcha'
import asyncLocalStorage from '@/utils/async-local-storage'
import errorModal from '@/utils/error-modal'
import routeGuard from '@/utils/route-guard'
import { withSession } from '@/utils/session-wrapper'

const { Title } = Typography

const LoginPage = () => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const captchaRef = useRef(null)
	const verifiedCallback = (token) => {
		form.setFieldValue('captcha', token)
	}
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { email, password, remember_me, captcha } = values
		return await axios
			.request({
				method: 'post',
				url: '/api/auth/login',
				data: { email, password, captcha }
			})
			.then((res) => {
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
				errorModal(err)
				setIsLoading(false)
				captchaRef.current.resetCaptcha()
				form.setFieldValue('captcha', undefined)
			})
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
									margin: '2rem 0 2rem 0',
									padding: '0 2rem 0 2rem',
									display: 'flex',
									gap: '2rem',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<Image src="/_assets/images/logo.png" width={100} height={100} alt="logo" />
								<Title level={3}>Login</Title>
								<Form
									form={form}
									onFinish={handleSubmit}
									autoComplete="off"
									layout="vertical"
									colon={false}
									style={{
										width: '100%'
									}}>
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
										<Row justify="space-between">
											<Col>
												<Button type="primary" htmlType="submit" loading={isLoading}>
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
export const getServerSideProps = withSession(async function ({ req }) {
	const accessToken = req.session?.auth?.accessToken
	const isLoggedOut = !accessToken
	const validator = [isLoggedOut]

	return routeGuard(validator, '/', {
		props: {}
	})
})
