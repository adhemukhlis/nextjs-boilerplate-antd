import { DatabaseOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import validateMenu from '@/utils/validate-menu'

/**
 * key === path page without trailing slash, check window.location.pathname
 */

const menus = (authMenu) =>
	validateMenu(
		[
			{
				key: '/master-data',
				label: 'Master Data',
				icon: <DatabaseOutlined />,
				children: [
					{
						key: '/users',
						// permission_code: 'users',
						label: 'Users',
						icon: <UserOutlined />
					}
				]
			},
			{
				key: '/logout',
				label: 'Logout',
				icon: <LogoutOutlined />
			}
		],
		authMenu
	)

export default menus
