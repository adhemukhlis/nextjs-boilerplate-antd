import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(function handler(req, res) {
	const sliderCaptcha = require('@slider-captcha/core')
	sliderCaptcha.create().then(async function ({ data, solution }) {
		req.session.captcha = solution
		await req.session.save()
		res.status(200).send(data)
	})
})
