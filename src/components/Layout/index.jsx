import { UserOutlined } from '@ant-design/icons'
import { Dropdown, Layout, Menu, theme, message, Avatar, Typography, Affix } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { IconArrowRightFromBracket } from '../icons/thin'
import menus from '@/configs/menu'
import asyncLocalStorage from '@/utils/asyncLocalStorage'

const { Content, Sider, Header } = Layout
const { Text } = Typography
const LayoutComponent = ({ children, username }) => {
	const [messageApi, contextHolder] = message.useMessage()
	const [collapsed, setCollapsed] = useState(true)
	const [rootFontSize, setRootFontSize] = useState(0)
	const router = useRouter()
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const currentPath = router.pathname

	const handleSelectMenu = (menu) => {
		if ('key' in menu && !!menu?.key) {
			router.push(menu.key)
		}
	}
	const handleLogOut = async () => {
		messageApi.open({
			key: 'logout',
			type: 'loading',
			content: 'Logging Out..'
		})
		axios.request({ method: 'POST', url: '/api/logout' }).then(async (res) => {
			messageApi.open({
				key: 'logout',
				type: 'success',
				content: res.data.message,
				duration: 4
			})
			router.replace('/login')
		})
	}
	const collapsedHandler = (value) => {
		setCollapsed(value)
		asyncLocalStorage.setItem('_sc', value)
	}
	const items = [
		{
			key: 'profile',
			label: <Text strong>{username}</Text>,
			icon: <UserOutlined />,
			onClick: () => router.push('/profile')
		},
		{
			key: 'logout',
			label: 'Logout',
			icon: <IconArrowRightFromBracket />,
			onClick: handleLogOut
		}
	]
	useEffect(() => {
		asyncLocalStorage.getItem('_sc').then((res) => {
			setCollapsed(JSON.parse(res ?? 'true'))
		})
	}, [])
	const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1
	return (
		<>
			<Layout
				style={{
					minHeight: '100vh'
				}}
				hasSider>
				<Sider
					collapsible
					width={250}
					style={{
						backgroundColor: colorBgContainer
					}}
					collapsed={collapsed}
					onCollapse={collapsedHandler}>
					<div
						style={{
							height: collapsed ? 100 : 40,
							margin: '0.6rem',
							// background: colorBgContainer,
							backgroundColor:'violet',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Image
							src="/_assets/images/logo.png"
							width={40}
							height={40}
							alt="logo"
							{...(collapsed
								? {
										style: {
											transform: 'rotate(-90deg)',
											transition: 'transform 0.2s ease'
										}
									}
								: {
										style: {
											transform: 'rotate(0deg)',
											transition: 'transform 0.2s ease'
										}
									})}
						/>
					</div>
					<Affix offsetTop={rootFontSize}>
						<Menu theme="light" defaultSelectedKeys={[currentPath]} mode="inline" items={menus} onSelect={handleSelectMenu} />
					</Affix>
				</Sider>
				<Layout>
					<Header style={{ padding: '1rem', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end' }}>
						<Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']}>
							<Avatar size="large" style={{ cursor: 'pointer' }} src={`https://ui-avatars.com/api/?name=${username}`} />
						</Dropdown>
					</Header>
					<Content
						style={{
							margin: '1rem',
							minHeight: 'calc(100vh-2rem)' // minHeight = heigh of screen - (margin top + margin bottom)
						}}>
						<div
							style={{
								padding: 24,
								height: '100%',
								background: colorBgContainer
							}}>
							{children}
						</div>
					</Content>
				</Layout>
			</Layout>
			{contextHolder}
		</>
	)
}
export default LayoutComponent
