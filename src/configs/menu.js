import { AppstoreOutlined, DatabaseOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
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
				key: '/components',
				label: 'Components',
				icon: <AppstoreOutlined />,
				children: [
					{
						key: '/components/forms',
						label: 'Forms'
					},
					{
						key: '/components/autoComplete',
						label: 'Auto Complete'
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
