import { CheckCircleTwoTone } from '@ant-design/icons'
import { Button, Form, Input, Modal, Row, Select, Space, Typography } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import errorModal from '@/utils/error-modal'
// import { getAllListProperty } from '../api/property'
// import { getRoles } from '../api/role'
// import MainDatePicker from '@/components/DatePicker'
// import axiosGroup from '@/utils/axiosGroup'
// import globalStore from '@/utils/global-store'
// import routeGuard from '@/utils/routeGuard'
// import { withSession } from '@/utils/sessionWrapper'
// import validatePermission from '@/utils/validate-permission'
// import ErrorPanel from '@/components/ErrorPanel'
const { Title } = Typography
const { confirm } = Modal

const AddUser = ({ errors, allRole }) => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const GENDER_OPTIONS = [
		{
			value: 1,
			label: 'Pria'
		},
		{
			value: 0,
			label: 'Wanita'
		}
	]
	const submitHandler = async (values) => {
		setLoading(true)
		await axios
			.request({
				url: '/api/user-management/create-user',
				method: 'POST',
				data: values
			})
			.then((res) => {
				if (res.status === 200) {
					confirm({
						title: 'Add data success!',
						icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
						content: 'Add data again?',
						okText: 'Yes',
						cancelText: 'No, back to User List',
						onCancel: () => {
							router.push(router.pathname.replace('/add', ''))
						},
						onOk: () => {
							form.resetFields()
						}
					})
				}
			})
			.catch((err) => {
				errorModal(err)
				return err
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<>
			<Form
				form={form}
				autoComplete="off"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 12 }}
				labelAlign="left"
				colon={false}
				onFinish={submitHandler}>
				<div
					className="card-blog"
					style={{
						padding: 8,
						paddingTop: '3rem',
						paddingLeft: '3rem',
						marginTop: 4,
						backgroundColor: 'white',
						marginBottom: 16,
						borderRadius: '30px'
					}}>
					<Form.Item
						name="username"
						label="Username"
						rules={[
							{ required: true, message: 'This field is required' },
							{ pattern: /^[^\s]+$/, message: 'Username cannot contain spaces' }
						]}>
						<Input style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item name="fullname" label="Fullname" rules={[{ required: true, message: 'This field is required' }]}>
						<Input style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="gender" label="Jenis Kelamin" rules={[{ required: true, message: 'This field is required' }]}>
						<Select options={GENDER_OPTIONS} />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!'
							},
							{
								required: true,
								message: 'Please input your E-mail!'
							}
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: 'Please input your password!'
							}
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						label="Confirm Password"
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
									return Promise.reject('Passwords do not match')
								}
							})
						]}>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ span: 16 }}>
						<Row justify="end">
							<Space>
								<Button htmlType="button" onClick={() => router.push('/users')} disabled={loading}>
									Back To List
								</Button>
								<Button type="primary" htmlType="submit" loading={loading}>
									Add
								</Button>
							</Space>
						</Row>
					</Form.Item>
				</div>
			</Form>
		</>
		// ) : (
		// 	<Result
		// 		status="403"
		// 		title="403"
		// 		subTitle="Sorry, you are not authorized to access this page."
		// 		extra={<Button onClick={() => window.history.back()}>Back</Button>}
		// 	/>
	)
}

// export const getServerSideProps = withSession(async ({ req }) => {
// 	const access_token = req.session?.auth?.accessToken
// 	const isLoggedIn = !!access_token
// 	let allRole = []
// 	const errors = []
// 	const [roleResp] = await axiosGroup([getAllRole(access_token)])

// 	if (roleResp.status === 200) {
// 		const { data } = roleResp.response.data.result
// 		allRole = data || {}
// 	} else {
// 		errors.push({ url: roleResp.url, message: roleResp.error.response.data.message })
// 	}
// 	// }
// 	return routeGuard([isLoggedIn], '/login', {
// 		props: {
// 			errors,
// 			allRole
// 		}
// 	})
// })

export default AddUser
