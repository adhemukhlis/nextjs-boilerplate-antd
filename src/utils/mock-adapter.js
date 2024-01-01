/**
 * Komponen mocking data axios
 * - onNoMatch : membiarkan akses keluar mock sesuai axios service
 * - timeout :  lama waktu tunggu maksimal
 */
import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/utils/apiService'

console.warn(
	`%c ---------- MOCK ADAPTER ACTIVE ----------`,
	`color:#00ffff; background-color: #0d0d0d; padding:10px; border: 2px dashed #FCD639; border-radius: 0.8em;`
)
const mock = new MockAdapter(apiClient, {
	onNoMatch: 'passthrough',
	delayResponse: 1000
})

//  regex for dynamic subpath ex. product/item/{id}
//  new RegExp(`${urls.PRODUCT_ITEM_DETAIL}/\\S+`)

mock.onGet('/api/v1/finance/listSummary').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: [
		{
			id: '0001',
			periode: 'Mar - 2023',
			property_name: 'Kos Alam sutra',
			total_revenue: 12500000,
			total_expense: 2530000
		},
		{
			id: '0002',
			periode: 'Feb - 2023',
			property_name: 'Kos Alam sutra',
			total_revenue: 17500000,
			total_expense: 2430000
		}
	],
	page: 1,
	per_page: 10,
	total: 2
})

mock.onPost('/auth/login').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: {
		accessToken:
			'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSREU4TUx0UU5MbmVCV1dsSUVEX1ZYNjk2aDFPSFpRRkphMmZ4djdfeDRjIn0.eyJleHAiOjE2ODUxMTYwNjMsImlhdCI6MTY4NTExNDI2MywianRpIjoiMDU0NTQxZGItMTc5Yi00YTk1LWEyZWMtNDk3ZDkyNTg0MzkwIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4xMDA6ODA4MC9yZWFsbXMva29zdHp5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImZhZmYxZmFjLWZmYjYtNDE1Zi04NzdmLWRiNjdmN2IyMThmMyIsInR5cCI6IkJlYXJlciIsImF6cCI6Imtvc3R6eS1iYWNrb2ZmaWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImRiOGIwMWNiLTUyNDUtNGNjNi04NTJhLTk5MDZlNzNlY2E3MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWtvc3R6eSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJrb3N0enktYmFja29mZmljZSI6eyJyb2xlcyI6WyJhZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZGI4YjAxY2ItNTI0NS00Y2M2LTg1MmEtOTkwNmU3M2VjYTcxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRhdGFzdGFmZmJhY2tvZmZpY2UiLCJlbWFpbCI6InRhdGFzdGFmZmJhY2tvZmZpY2VAZ21haWwuY29tIn0.ilpuyIufo7FqvTippbynf6Y1uv58DIlhqOr-3lc1YiE0c6lLrozOUPxYdRSpy_xySRJIVykmMHwIqBVCiTY0Qt74O1KmuSBMepz-gPh_3i18VGI-SaGtdYQI1lA88VuZTQXXrnG1N3jjnx1guL_yWUxslVQKsA_72kKBSyNv7vbqMXP4cyvTRDFm4JLU-WxAQq5ZCS9OTLgVWQtlDSbmLz61d8hWV4u5ZV3IVVFsTv3DeWLBDjNHnBPNy2cuLXEMjlm81Z3abozgtNZPUnE0IwZQm-0XTC-6GCdv-MDi0ciYm_vppYhPIbUNBWlfIRtblYppKevbrH4EI4OEfRXc4g',
		refresh_token:
			'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwZWFjOTg0Yy1iZTQ5LTQ0YzgtOGU2Zi05M2M3NTI2MzQzN2MifQ.eyJleHAiOjE2ODUxMTYwNjMsImlhdCI6MTY4NTExNDI2MywianRpIjoiY2I3MWRiZDAtMjg3NS00NmU2LWI4NzAtNTA4NTU5MzM0OTkwIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4xMDA6ODA4MC9yZWFsbXMva29zdHp5IiwiYXVkIjoiaHR0cDovLzE5Mi4xNjguMC4xMDA6ODA4MC9yZWFsbXMva29zdHp5Iiwic3ViIjoiZmFmZjFmYWMtZmZiNi00MTVmLTg3N2YtZGI2N2Y3YjIxOGYzIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6Imtvc3R6eS1iYWNrb2ZmaWNlIiwic2Vzc2lvbl9zdGF0ZSI6ImRiOGIwMWNiLTUyNDUtNGNjNi04NTJhLTk5MDZlNzNlY2E3MSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImRiOGIwMWNiLTUyNDUtNGNjNi04NTJhLTk5MDZlNzNlY2E3MSJ9.XFrChMhIl2eM2eX6fPqTI69OaDct7AL54KwYLy7x5AM',
		role: {
			role_id: '33035466-2fef-4c57-a61f-622ff482193e',
			role_name: 'admin',
			status_role: 1
		},
		staff: [
			{
				staff_id: 'b35c3265-0f7b-45b6-9727-c1ff1e7d882f',
				staff_name: 'Tata Staff Backoffice'
			}
		],
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
			},
			{
				code: 'tenant_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'list_complain',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'event_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'point_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'master_brands',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'finance_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'gallery_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'content_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'role_management',
				allowed: ['create', 'update', 'delete', 'read']
			},
			{
				code: 'list_saran',
				allowed: ['create', 'update', 'delete', 'read']
			}
		]
	}
})

mock.onGet(new RegExp(`/api/v1/tenant/detail/\\S+`)).reply(200, {
	status: true,
	code: 200,
	message: 'Successfully get list suggestion',
	data: {
		tenant: {
			id: '0001',
			self_photo: 'selfPhotoTenantLinkS3',
			name: 'SUSILO',
			id_no: '35732145698007',
			gender: 'm',
			birth_date: '21-12-1991',
			email: 'susilo.utomo@mail.com',
			phone: '081291091531',
			id_photo: 'idPhotoTenantLinkS3',
			education_lov: 'S1',
			work_lov: 'PNS',
			bank_lov: 'BCA',
			account_no: '021458799',
			account_name: 'Susilo'
		},
		emergency_contact: {
			emergency_name: 'Santi',
			emergency_phone: '0817946123',
			emergency_relation_lov: 'PARENTS'
		},
		rent_detail: {
			stay_status: 'ACTIVE',
			property_name: 'Kos Mulia Jaya',
			room_type: 'Deluxe',
			room_no: '24',
			checkin_date: '30-11-2022',
			checkout_date: '-',
			rent_price_monthly: 1750000,
			deposit_amount: 250000,
			addons_data: [
				{
					category_lov: 'roommate',
					code: 'roommate',
					name: 'roommate',
					price: 375000
				},
				{
					category_lov: 'park',
					code: 'bikepark',
					name: 'bike parking',
					price: 15000
				}
			],
			addons_total_bill_monthly: 390000,
			grand_total: 2390000,
			payment_status: 'PAID KOSTZY',
			due_date_monthly: '25-00-0000'
		},
		roommate: {
			roommate_relation_lov: 'Saudara',
			support_doc: 'supportDocLinkAwsS3',
			self_photo: 'selfPhotoRoommateLinkS3',
			name: 'Utomo',
			id_no: '35732145698007',
			gender: 'm',
			birth_date: '21-12-1991',
			email: 'utomo@mail.com',
			phone: '081291091531',
			id_photo: 'idPhotoRoommateLinkS3',
			education_lov: 'PNS',
			work_lov: 'PNS',
			bank_lov: 'BCA',
			account_no: '021458799',
			account_name: 'Utomo',
			emergency_name: 'Santi',
			emergency_phone: '0817946123',
			emergency_relation_lov: 'PARENTS'
		},
		roommate_rent: {
			checkin_date: '21-12-2022',
			checkout_date: '-',
			roommate_bill_monthly: 375000
		},
		park: {
			vehicle_type: 'bike',
			nopol: 'B 1234 ATS',
			brand_lov: 'Honda',
			color: 'Merah',
			park_bill_monthly: 15000
		}
	}
})
