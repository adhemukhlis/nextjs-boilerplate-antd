import { Button, Form, Input, Result, Space, Switch, Typography, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MainButtonDelete from '@/components/ButtonDelete'
import ErrorPanel from '@/components/ErrorPanel'
import { getDetailRole } from '@/services/role'
import axiosGroup from '@/utils/axiosGroup'
import errorModal from '@/utils/error-modal'
import { withSession } from '@/utils/session-wrapper'
import routeGuard from '@/utils/route-guard'
import globalStore from '@/utils/global-store'
import validatePermission from '@/utils/validate-permission'
const { Title } = Typography

const DetailMasterRole = ({ isNotFound, errors, hasUpdateAccess, hasReadAccess, roleData }) => {
	const [form] = Form.useForm()
	const [isUpdate, setIsUpdate] = useState(false)
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (values) => {
		const { status, name } = values
		setLoading(true)
		axios
			.request({
				method: 'post',
				url: '/api/role/update-role/' + router.query.id,
				data: { name, status: status ? 1 : 0 }
			})
			.then((res) => {
				if (res.status === 200) {
					message.success('Update data success!', 3)
					setIsUpdate(false)
				}
			})
			.catch((err) => {
				errorModal(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const handleDelete = async () =>
		await axios
			.request({
				method: 'post',
				url: '/api/role/delete-role/' + router.query.id
			})
			.then((res) => {
				if (res.status === 200) {
					message.success('Delete data success!', 3)
					setTimeout(() => {
						router.push('/role-management')
					}, 2000)
				}
			})

	const handleCancel = () => {
		form.resetFields()
		setIsUpdate(false)
	}
	return !isNotFound && hasReadAccess ? (
		<>
			<ErrorPanel errors={errors} />
			<Title level={3}>Detail Role - {roleData?.name}</Title>
			<div style={{ paddingTop: '4rem' }}>
				<Form
					form={form}
					autoComplete="off"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 12 }}
					labelAlign="left"
					colon={false}
					onFinish={handleSubmit}
					initialValues={{ ...roleData, status: !!roleData?.status }}
					disabled={!isUpdate}>
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
							<MainButtonDelete
								title="Delete Role"
								description="Are you sure to delete?"
								disabled={loading || isUpdate}
								onConfirm={handleDelete}
							/>
							{!isUpdate && hasUpdateAccess && (
								<Button htmlType="button" type="primary" onClick={() => setIsUpdate(true)} disabled={false}>
									Update
								</Button>
							)}
							{isUpdate && (
								<>
									<Button onClick={handleCancel} disabled={loading}>
										Cancel
									</Button>
									<Button type="primary" htmlType="submit" loading={loading}>
										Submit
									</Button>
								</>
							)}
						</Space>
					</Form.Item>
				</Form>
			</div>
		</>
	) : hasReadAccess ? (
		<>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={<Button onClick={() => window.history.back()}>Back</Button>}
			/>
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

export default DetailMasterRole

export const getServerSideProps = withSession(async ({ req, query }) => {
	const access_token = req.session?.auth?.access_token
	const isLoggedIn = !!access_token
	const authMenu = globalStore.get('authMenu')
	const hasReadAccess = validatePermission(authMenu || [], 'role_management', 'read')
	const hasUpdateAccess = validatePermission(authMenu || [], 'role_management', 'update')
	const validator = [isLoggedIn]
	let roleData = {}
	let isNotFound = false
	const errors = []

	const [responseDetailRole] = await axiosGroup([getDetailRole(access_token, query.id)])
	if (responseDetailRole.status === 200) {
		const { data } = responseDetailRole.response.data
		roleData = data || {}
	} else if ([400, 404].includes(responseDetailRole.status)) {
		isNotFound = true
	} else {
		errors.push({ url: responseDetailRole.url, message: responseDetailRole.error.response.data.message })
	}

	return routeGuard(validator, '/', {
		props: { isNotFound, errors, hasUpdateAccess, hasReadAccess, roleData }
	})
})
