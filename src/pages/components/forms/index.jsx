import { Button, Card, Checkbox, Col, Divider, Form, Input, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRef, useState } from 'react'
import MainCaptcha from '@/components/Captcha'
import EmbedCode from '@/components/EmbedCode'

const { Title } = Typography
// qs.stringify(newSearch, { addQueryPrefix: true })
// qs.parse(search, { ignoreQueryPrefix: true })
const ComponentsFormsPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()
	const captchaRef = useRef(null)
	const handleSubmit = async (values) => {
		setIsLoading(true)
		return await new Promise((resolve) => {
			setTimeout(resolve, 2000)
		}).finally(() => {
			setIsLoading(false)
		})
	}
	const verifiedCallback = (token) => {
		form.setFieldValue('captcha', token)
	}
	return (
		<>
			<Title level={4}>Forms</Title>
			<Card>
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
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!'
							},
							{
								validator: (rule, value) => {
									const regex = new RegExp('\\s', '')
									if (value && regex.test(value)) {
										return Promise.reject('Username should not contains whitespace')
									}
									return Promise.resolve()
								}
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
			</Card>
			<Card style={{ marginTop: '1rem' }}>
				<EmbedCode url="https://raw.githubusercontent.com/adhemukhlis/nextjs-boilerplate-antd/main/src/pages/components/forms/index.jsx" />
			</Card>
		</>
	)
}
export default ComponentsFormsPage
