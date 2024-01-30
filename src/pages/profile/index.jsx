import { Typography } from 'antd'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import UserIcon from '@/assets/images/user-icon.png'
import isEmpty from '@/utils/is-empty'
import routeGuard from '@/utils/route-guard'

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

export const getServerSideProps = async ({ req }) => {
	const session = await getSession({ req: req })

	const isLoggedIn = !isEmpty(session?.auth?.accessToken)

	const validator = [isLoggedIn]

	return routeGuard(validator, '/', {
		props: { user: session?.user }
	})
}
export default ProfilePage
