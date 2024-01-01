import validate from './index'

const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string', minLength: 4, maxLength: 16 },
		email: { type: 'string' },
		password: { type: 'string', minLength: 8, maxLength: 32 },
		confirm_password: {
			const: {
				$data: '1/password'
			},
			type: 'string'
		},
		gender: { type: 'string' }
	},
	required: ['username', 'email', 'gender', 'password', 'confirm_password'],
	additionalProperties: false
}

const registerValidator = (data) => validate(data, userSchema)
export default registerValidator
