import { CheckCircleTwoTone } from '@ant-design/icons'
import { Button, Form, Input, Modal, Result, Space, Switch, Typography } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'

import { useState } from 'react'
import errorModal from '@/utils/error-modal'
import globalStore from '@/utils/global-store'
import routeGuard from '@/utils/route-guard'
import { withSession } from '@/utils/session-wrapper'
import validatePermission from '@/utils/validate-permission'

const { Title } = Typography
const { confirm } = Modal
const AddMasterRole = ({ hasCreateAccess }) => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const handleSubmit = async (values) => {
		const { status, name } = values
		setLoading(true)
		return await axios
			.request({
				method: 'post',
				url: '/api/role/add-role',
				data: { name, status: status ? 1 : 0 }
			})
			.then((res) => {
				if (res.status === 200) {
					confirm({
						title: 'Add data success!',
						icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
						content: 'want to add data again?',
						okText: 'Yes',
						cancelText: 'No, back to Table',
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
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return hasCreateAccess ? (
		<>
			<Title level={3}>Add New Role</Title>
			<div style={{ paddingTop: '4rem' }}>
				<Form
					form={form}
					initialValues={{ status: true }}
					autoComplete="off"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 12 }}
					labelAlign="left"
					colon={false}
					onFinish={handleSubmit}>
					<Form.Item name="name" label="Nama Role" rules={[{ required: true, message: 'This field is required' }]}>
						<Input />
					</Form.Item>
					<Form.Item valuePropName="checked" name="status" label="Status">
						<Switch checkedChildren="aktif" unCheckedChildren="nonaktif" />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6 }}>
						<Space>
							<Button htmlType="button" onClick={() => window.history.back()} disabled={loading}>
								Back
							</Button>
							<Button type="primary" htmlType="submit" loading={loading}>
								Submit
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</>
	) : (
		<>
			<Result
				status="403"
				title="403"
				subTitle="Sorry, you are not authorized to access this page."
				extra={<Button onClick={() => window.history.back()}>Back</Button>}
			/>
		</>
	)
}

export default AddMasterRole

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.accessToken
	const isLoggedIn = !!accessToken
	const authMenu = globalStore.get('authMenu')
	const hasCreateAccess = validatePermission(authMenu || [], 'role_management', 'create')
	const validator = [isLoggedIn]
	const errors = []
	return routeGuard(validator, '/', {
		props: { errors, hasCreateAccess }
	})
})
