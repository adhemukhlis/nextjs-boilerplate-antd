import { Typography } from 'antd'
import routeGuard from '@/utils/route-guard'
import { withSession } from '@/utils/session-wrapper'
// import dayjs from 'dayjs'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
// const localeData = require('dayjs/plugin/localeData')
// dayjs.extend(localeData)
const { Title, Text } = Typography
const Index = ({ username }) => {
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
				<Title>Kostzy Backoffice</Title>
				<span>
					{'Account : '}
					<Text strong>{username}</Text>
				</span>
			</div>
			{/* <ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="register" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="transaction" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer> */}
		</>
	)
}
export default Index
export const getServerSideProps = withSession(async function ({ req, query, ...other }) {
	const access_token = req.session?.auth?.access_token
	const isLoggedIn = !!access_token
	return routeGuard([isLoggedIn], '/login', {
		props: {
			username: req.session?.auth?.username
		}
	})
})
