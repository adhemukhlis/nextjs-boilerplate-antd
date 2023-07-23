import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(function handler(req, res) {
	const sliderCaptcha = require('@slider-captcha/core')
	sliderCaptcha.verify(req.session.captcha, req.body).then(async function (verification) {
		if (verification.result === 'success') {
			req.session.captcha_token = verification.token
			await req.session.save()
		}
		res.status(200).send(verification)
	})
})
