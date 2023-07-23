import { Button, Tag, Typography } from 'antd'
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import MainTable from '@/components/Table/MainTable'
import ErrorPanel from '@/components/ErrorPanel'
import { withSession } from '@/utils/session-wrapper'
import routeGuard from '@/utils/route-guard'
const { Title } = Typography
const STATUS_COLORS = { female: 'magenta', male: 'blue' }
const STATUS_TEXT = { female: 'Female', male: 'Male' }
const UsersPage = ({ errors, query, listUser }) => {
	const router = useRouter()
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
	return (
		<>
			<ErrorPanel errors={errors} />
			<Title level={3}>Master Role</Title>
			<div
				style={{
					marginBottom: '1rem',
					display: 'flex',
					gap: '1rem'
				}}>
				<Link href={`${router.pathname}/add`}>
					<Button type="primary" icon={<PlusOutlined />}>
						Add
					</Button>
				</Link>
			</div>
			<MainTable rowKey="email" columns={columns} query={query} dataSource={listUser} />
		</>
	)
}

export default UsersPage

export const getServerSideProps = withSession(async ({ req, query }) => {
	const access_token = req.session?.auth?.access_token
	const isLoggedIn = !!access_token
	const validator = [isLoggedIn]
	let listUser = []
	let queryMerge = { ...query }
	const errors = []
	if (![isLoggedIn].includes(false)) {
		await axios
			.request({
				method: 'GET',
				baseURL: 'http://' + req.headers.host,
				url: '/api/users',
				headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined
			})
			.then((res) => {
				listUser = res.data
			})
	}
	return routeGuard(validator, '/', {
		props: { query: queryMerge, errors, listUser }
	})
})
