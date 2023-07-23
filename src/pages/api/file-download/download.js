import request from 'request'

import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(async (req, res) => {
	const { url } = req.body
	if (req.method === 'POST') {
		request.get(url).pipe(res)
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
