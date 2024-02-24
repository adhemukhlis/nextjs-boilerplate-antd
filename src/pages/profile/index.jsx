import { Typography } from 'antd'
import Image from 'next/image'
import UserIcon from '@/assets/images/user-icon.png'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'

const { Title } = Typography

const ProfilePage = ({ user }) => {
	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
			<Image
				src={UserIcon}
				loader={() => user.picture}
				width={160}
				height={160}
				alt="profile-picture"
				style={{ borderRadius: '50%' }}
			/>
			<Title level={2}>{user.username}</Title>
		</div>
	)
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/login', {
		props: { user: req.session.user }
	})
})
export default ProfilePage
