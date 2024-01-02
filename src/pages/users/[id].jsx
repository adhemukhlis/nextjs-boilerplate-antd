import { Button, Form, Input, Popconfirm, Row, Select, Space, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import errorModal from '@/utils/error-modal'
// import { getDetailUser } from '@/services/user'
// import axiosGroup from '@/utils/axiosGroup'
// import routeGuard from '@/utils/routeGuard'
// import { withSession } from '@/utils/sessionWrapper'

const DetailUser = ({ detailUser }) => {
	const [form] = Form.useForm()
	const router = useRouter()
	// State Management
	const [updateLoading, setUpdateLoading] = useState(false)
	const [deleteLoading, setDeleteLoading] = useState(false)
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
	const handleSubmit = async (values) => {
		setUpdateLoading(true)
		await axios
			.request({
				method: 'post',
				url: '/api/users/update-user',
				data: { id: router.query.id, ...values }
			})
			.then((res) => {
				message.success('Data Updated!', 3)
				return res
			})
			.catch((err) => {
				errorModal(err)
				return err
				// throw err
			})
			.finally(() => {
				router.push({
					pathname: '/users'
				})
			})
		setUpdateLoading(true)
	}
	const text = 'Are you sure to delete this User?'
	const description = 'This action will permanently delete the user'
	const handleDelete = async () => {
		setDeleteLoading(true)
		return await axios
			.request({
				method: 'post',
				url: '/api/users/delete-user',
				data: { id: router.query.id }
			})
			.then((res) => {
				message.success('Data Deleted!', 3)
				return res
			})
			.catch((err) => {
				errorModal(err)
				return err
				// throw err
			})
			.finally(() => {
				router.push({
					pathname: '/users'
				})
				setDeleteLoading(false)
			})
	}

	return (
		<>
			{/* <ErrorPanel errors={errors} /> */}
			<Form
				form={form}
				autoComplete="off"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 12 }}
				labelAlign="left"
				onFinish={handleSubmit}
				initialValues={detailUser}
				colon={false}>
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
					<Form.Item name="username" label="Username" rules={[{ required: true, message: 'This field is required' }]}>
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
					{/* <Form.Item
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
					</Form.Item> */}
					<Form.Item wrapperCol={{ span: 16 }}>
						<Row justify="end">
							<Space>
								<Button htmlType="button" onClick={() => window.history.back()} disabled={updateLoading}>
									Back to list
								</Button>
								<Popconfirm
									placement="bottom"
									title={text}
									description={description}
									onConfirm={handleDelete}
									okText="Yes"
									cancelText="No">
									<Button type="primary" danger loading={deleteLoading}>
										Delete
									</Button>
								</Popconfirm>
								<Button type="primary" htmlType="submit" loading={updateLoading}>
									Update
								</Button>
							</Space>
						</Row>
					</Form.Item>
				</div>
			</Form>
		</>
	)
}

export default DetailUser

// export const getServerSideProps = withSession(async ({ req, query }) => {
// 	const access_token = req.session?.auth?.access_token
// 	const isLoggedIn = !!access_token
// 	let detailUser = {}
// 	const errors = []
// 	const [detailUserResp] = await axiosGroup([getDetailUser(access_token, query.id)])
// 	if (detailUserResp.status === 200) {
// 		const { data } = detailUserResp.response.data
// 		detailUser = data || {}
// 	} else {
// 		errors.push({ url: detailUserResp.url, message: detailUserResp.error.response.data.message })
// 	}

// 	return routeGuard([isLoggedIn], '/login', {
// 		props: {
// 			errors,
// 			detailUser
// 		}
// 	})
// })
