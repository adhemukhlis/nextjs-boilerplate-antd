import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	const sliderCaptcha = require('@slider-captcha/core')
	sliderCaptcha.verify(session.captcha, req.body).then(async function (verification) {
		if (verification.result === 'success') {
			session.captcha_token = verification.token
			await session.save()
		}
		res.status(200).send(verification)
	})
}
export default api
