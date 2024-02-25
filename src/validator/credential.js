import validate from './index'

const regEmail = '^([\\w-]+(?:[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$'

const credentialSchema = {
	type: 'object',
	properties: {
		email: { type: 'string', pattern: regEmail },
		password: { type: 'string', minLength: 8, maxLength: 32 }
	},
	required: ['email', 'password'],
	additionalProperties: false
}

const credentialValidator = (data) => validate(data, credentialSchema)
export default credentialValidator
