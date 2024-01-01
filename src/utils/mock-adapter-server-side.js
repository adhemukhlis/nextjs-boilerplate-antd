import MockAdapter from 'axios-mock-adapter'

console.warn(
	`%c ---------- MOCK ADAPTER ACTIVE ----------`,
	`color:#00ffff; background-color: #0d0d0d; padding:10px; border: 2px dashed #FCD639; border-radius: 0.8em;`
)

export const authLoginMock = (axiosInstance) => {
	const mock = new MockAdapter(axiosInstance, {
		onNoMatch: 'passthrough',
		delayResponse: 1000
	})
	mock.onPost('/auth/login').reply(200, {
		status: true,
		code: 200,
		message: '[mock] login success',
		data: {
			accessToken: '<accessToken>',
			refresh_token: '<refresh_token>',
			role: {
				role_id: '822ba1f0-647b-4b05-9403-487199c0f484',
				role_name: 'staff',
				status_role: 1
			},
			staff: {
				staff_id: '6d62c922-f19b-48e1-b34f-6b90100c640c',
				staff_name: 'Staff Staffoffice'
			},
			menu: [
				{
					code: 'voucher_management',
					allowed: ['create', 'update', 'delete', 'read']
				},
				{
					code: 'owner_management',
					allowed: ['create', 'update', 'delete', 'read']
				},
				{
					code: 'staff_management',
					allowed: ['create', 'update', 'delete', 'read']
				},
				{
					code: 'master_brand',
					allowed: ['create', 'update', 'delete', 'read']
				},
				{
					code: 'property_management',
					allowed: ['create', 'update', 'delete', 'read']
				}
			]
		}
	})
}
