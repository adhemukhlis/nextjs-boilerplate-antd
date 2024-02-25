import '@/styles/globals.css'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { getIronSession } from 'iron-session'
import App from 'next/app'
import { Nunito } from 'next/font/google'
import { useRouter } from 'next/router'
import React from 'react'
import LayoutComponent from '@/components/Layout'
import PUBLIC_PAGE_URL from '@/configs/public-page-url'
import sessionOptions from '@/utils/sessionOptions'

const nunito = Nunito({
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap'
})

if (!process.browser) React.useLayoutEffect = React.useEffect

const EntryPoint = ({ Component, pageProps, user }) => {
	const router = useRouter()
	return (
		<main className={nunito.className}>
			<StyleProvider hashPriority="high">
				<ConfigProvider
					theme={{
						token: {
							fontFamily: nunito.style.fontFamily
						}
					}}>
					{PUBLIC_PAGE_URL.includes(router.pathname) ? (
						<div
							style={{
								minHeight: '100vh', // minHeight = heigh of screen - (margin top + margin bottom)
								display: 'flex',
								justifyContent: 'center'
							}}>
							<Component {...pageProps} />
						</div>
					) : (
						<LayoutComponent user={user}>
							<Component {...pageProps} />
						</LayoutComponent>
					)}
				</ConfigProvider>
			</StyleProvider>
		</main>
	)
}

export default EntryPoint

EntryPoint.getInitialProps = async (appContext) => {
	let session = { user: { username: '' } }

	session = await getIronSession(appContext.ctx.req, appContext.ctx.res, sessionOptions)

	const pageProps = await App.getInitialProps(appContext)
	return { ...pageProps, user: session.user }
}
