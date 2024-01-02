import { Button, Form, Input, Tag, Typography } from 'antd'
import { isBoolean, isEmpty, isNumber, omit, pickBy } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ErrorPanel from '@/components/ErrorPanel'
import MainTable from '@/components/Table/MainTable'
const { Title } = Typography

const STATUS_COLORS = { female: 'magenta', male: 'blue' }
const STATUS_TEXT = { female: 'Female', male: 'Male' }
const UsersPage = ({ errors, query, listUser }) => {
	const router = useRouter()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const handleFilter = (values) => {
		setLoading(true)
		const other = omit(query, ['total', 'page', 'per_page'])
		const params = pickBy({ ...other, ...values }, (v) => isNumber(v) || isBoolean(v) || !isEmpty(v))
		router
			.push({
				pathname: '/user-management',
				query: params
			})
			.finally(() => setLoading(false))
	}
	const columns = [
		{
			key: 'username',
			dataIndex: 'username',
			title: 'Username',
			render: (value, row) => <Link href={`${router.pathname}/` + row.id}>{value}</Link>
		},
		{
			key: 'email',
			dataIndex: 'email',
			title: 'Email'
		},
		{
			key: 'gender',
			dataIndex: 'gender',
			title: 'Gender',
			render: (value) => (
				<Tag bordered={false} color={STATUS_COLORS[value]}>
					{STATUS_TEXT[value]}
				</Tag>
			)
		}
	]

	const data = [
		{
			id: 1,
			username: 'john_doe',
			email: 'john.doe@example.com',
			gender: 'male'
		},
		{
			id: 2,
			username: 'jane_smith',
			email: 'jane.smith@example.com',
			gender: 'female'
		},
		{
			id: 3,
			username: 'sam_jackson',
			email: 'sam.jackson@example.com',
			gender: 'male'
		}
		// Add more data as needed
	]

	return (
		<>
			<ErrorPanel errors={errors} />
			<Title level={3}>Users</Title>
			<div
				style={{
					marginBottom: '1.6rem',
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '1rem'
				}}>
				<div>
					<Button
						type="primary"
						// style={{ borderRadius: '13px', marginLeft: '0.8rem' }}
						onClick={() => router.push('users/add')}>
						Add
					</Button>
				</div>
				<div>
					<Form form={form} onFinish={handleFilter} layout="inline">
						<Form.Item name="username">
							<Input placeholder="Username" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={loading}>
								Search
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>

			<MainTable rowKey="email" columns={columns} query={query} dataSource={data} />
		</>
	)
}

export default UsersPage

// export const getServerSideProps = withSession(async ({ req, query }) => {
// 	const accessToken = req.session?.auth?.accessToken
// 	const isLoggedIn = !!accessToken
// 	const validator = [isLoggedIn]
// 	let listUser = []
// 	const queryMerge = { ...query }
// 	const errors = []
// 	if (![isLoggedIn].includes(false)) {
// 		await axios
// 			.request({
// 				method: 'GET',
// 				baseURL: 'http://' + req.headers.host,
// 				url: '/api/users',
// 				headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
// 				Authorization: `Bearer ${accessToken}`
// 			})
// 			.then((res) => {
// 				listUser = res.data
// 			})
// 	}
// 	return routeGuard(validator, '/', {
// 		props: { query: queryMerge, errors, listUser }
// 	})
// })
