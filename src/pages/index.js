import { Typography } from 'antd'
import routeGuard from '@/utils/route-guard'
import { withSession } from '@/utils/session-wrapper'
// import dayjs from 'dayjs'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
// const localeData = require('dayjs/plugin/localeData')
// dayjs.extend(localeData)
const { Title, Text } = Typography
const Index = () => {
	// const months = dayjs.monthsShort()
	// const data = months.map((month) => ({
	// 	name: month,
	// 	transaction: Math.round(Math.random() * 100),
	// 	register: Math.round(Math.random() * 100)
	// }))

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
export const getServerSideProps = withSession(async function ({ req, query, ...other }) {
	const accessToken = req.session?.auth?.accessToken
	const isLoggedIn = !!accessToken
	return routeGuard([isLoggedIn], '/login', {
		props: {}
	})
})
