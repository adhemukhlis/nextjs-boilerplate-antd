import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
	pages: {
		signIn: '/signin'
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			async authorize(credentials) {
				const isPasswordMatch = true
				const username = credentials.email.split('@')[0]
				if (!isPasswordMatch) {
					return null
				}

				return {
					payload: {
						auth: {
							accessToken: '000-access-token-000'
						},
						userdata: {
							username,
							picture: `https://ui-avatars.com/api/?name=${username}`
						}
					},
					name: username,
					email: credentials.email
				}
			}
		})
	],
	callbacks: {
		async signIn({ ..._other }) {
			return true
		},
		async jwt({ token, user, ..._other }) {
			if (user) {
				token.payload = user.payload
			}
			return token
		},
		async session({ session, token, ..._other }) {
			session.auth = token.payload.auth
			session.user = token.payload.userdata
			return session
		}
	},

	secret: process.env.SESSION_KEY,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30 Days
	}
})
