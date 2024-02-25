import { HomeOutlined } from '@ant-design/icons'

/**
 * key === path page without trailing slash, check window.location.pathname
 */

const menus = [
	{
		key: '/',
		label: 'Dashboard',
		icon: <HomeOutlined />
		// children: [
		// 	{
		// 		key: '/users',
		// 		// permission_code: 'users',
		// 		label: 'Users',
		// 		icon: <UserOutlined />
		// 	}
		// ]
	}
	// {
	// 	key: '/components',
	// 	label: 'Components',
	// 	icon: <AppstoreOutlined />,
	// 	children: [
	// 		{
	// 			key: '/components/forms',
	// 			label: 'Forms'
	// 		},
	// 		{
	// 			key: '/components/autoComplete',
	// 			label: 'Auto Complete'
	// 		}
	// 	]
	// }
]

export default menus
