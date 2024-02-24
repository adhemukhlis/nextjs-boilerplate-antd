import { Typography } from 'antd'
import { getSession } from 'next-auth/react'
import isEmpty from '@/utils/is-empty'
import routeGuard from '@/utils/route-guard'

const { Title } = Typography
const Index = () => {
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
export default Index
export const getServerSideProps = async ({ req }) => {
	const session = await getSession({ req: req })

	const isLoggedIn = !isEmpty(session?.auth?.accessToken)

	const validator = [isLoggedIn]

	return routeGuard(validator, '/login', {
		props: {}
	})
}
