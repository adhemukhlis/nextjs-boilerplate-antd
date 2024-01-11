import { Button } from 'antd'
import { getSession, signOut } from 'next-auth/react'
import isEmpty from '@/utils/is-empty'
const ProfilePage = ({ session }) => {
	return (
		<div>
			<h2>Profile</h2>
			<span>{JSON.stringify(session)}</span>
			<Button onClick={() => signOut()}>Sign Out</Button>
		</div>
	)
}
export const getServerSideProps = async ({ req }) => {
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
export default ProfilePage
