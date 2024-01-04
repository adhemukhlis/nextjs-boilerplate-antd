import getIronSessionHandler from '@/utils/session'

const api = async (req, res) => {
	const session = await getIronSessionHandler(req, res)
	const sliderCaptcha = require('@slider-captcha/core')
	sliderCaptcha.create().then(async function ({ data, solution }) {
		session.captcha = solution
		await session.save()
		res.status(200).send(data)
	})
}
export default api
