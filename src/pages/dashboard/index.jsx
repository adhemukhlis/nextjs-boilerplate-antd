import { Typography } from 'antd'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'

const { Title } = Typography
const DashboardPage = () => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					flexDirection: 'column'
				}}>
				<Title>NextJS Boilerplate Ant Design</Title>
			</div>
		</>
	)
}
export default DashboardPage
export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/login', {
		props: {}
	})
})
