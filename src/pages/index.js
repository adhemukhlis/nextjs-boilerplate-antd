import { Typography } from 'antd'
import { getSession } from 'next-auth/react'
import isEmpty from '@/utils/is-empty'

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
export const getServerSideProps = async ({ req, res, query, ...other }) => {
	const session = await getSession({ req: req })
	if (isEmpty(session?.auth?.accessToken)) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		}
	}
	return {
		props: { session }
	}
}
