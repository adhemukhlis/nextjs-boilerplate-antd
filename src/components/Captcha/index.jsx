// refactor passed
import SliderCaptcha from '@slider-captcha/react'
import PropTypes from 'prop-types'
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'

const MainCaptcha = forwardRef(({ create, verify, callback }, ref) => {
	const [visibleCaptcha, setVisibleCaptcha] = useState(true)
	useImperativeHandle(ref, () => ({
		resetCaptcha() {
			setVisibleCaptcha(false)
			setTimeout(() => {
				setVisibleCaptcha(true)
			}, 400)
		}
	}))
	return visibleCaptcha ? <SliderCaptcha create={create} verify={verify} callback={callback} /> : <Fragment></Fragment>
})
MainCaptcha.defaultProps = {
	callback: () => {},
	create: '',
	verify: ''
}
MainCaptcha.propTypes = {
	callback: PropTypes.func,
	create: PropTypes.string,
	verify: PropTypes.string
}
export default MainCaptcha
