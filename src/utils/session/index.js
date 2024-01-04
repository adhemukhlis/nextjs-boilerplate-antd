import { getIronSession } from 'iron-session'
import sessionOptions from '@/utils/session/session-options'
const getIronSessionHandler = async (req, res) => {
	// const nextResponse = NextResponse.next()
	const session = await getIronSession(req, res, sessionOptions)
	return session
}
export default getIronSessionHandler
