import { createPdf, errorPdfHtmlTemplate } from '../../../../trash/components/PdfGenerator'
import { withSessionRoute } from '@/utils/session-wrapper'

export default withSessionRoute(async (req, res) => {
	// console.log('ini req body', req.body)
	const data = req.body
	// console.log('ini data:', data)
	// const dummy = {
	// 	property_name: 'kos alam',
	// 	periode: '06-2023',
	// 	clientName: 'Ava Wright',
	// 	clientCompany: 'BBB  Inc.',
	// 	billing: {
	// 		old_tenant_commission_pct: 0.5,
	// 		old_tenant_commission: 400000,
	// 		new_tenant_commission_pct: 2.5,
	// 		new_tenant_commission: 300000,
	// 		reimbursement_expense: 750000,
	// 		total_billing: 1450000
	// 	},
	// 	income_statement: {
	// 		revenue: {
	// 			rent_revenue: 1000000,
	// 			parking_revenue: 2000000,
	// 			others: 3000000,
	// 			total_revenue: 6000000
	// 		},
	// 		expense: {
	// 			operating_expense: 100000,
	// 			environment_expense: 200000,
	// 			maintenance_repairment_expense: 300000,
	// 			salary_expense: 400000,
	// 			other_expense: 500000,
	// 			total_expense: 1500000
	// 		},
	// 		net_income: 4500000
	// 	},
	// 	income_details: [
	// 		{
	// 			no: 1,
	// 			tenant_name: 'Susilo',
	// 			room: 100,
	// 			deposit: 100000,
	// 			parking: 200000,
	// 			others: 300000,
	// 			keterangan: 'Dibayar lunas'
	// 		},
	// 		{
	// 			no: 2,
	// 			tenant_name: 'Santo',
	// 			room: 200,
	// 			deposit: 200000,
	// 			parking: 300000,
	// 			others: 400000,
	// 			keterangan: 'Belum dibayar'
	// 		}
	// 	],
	// 	total_income: 1500000,
	// 	expense_details: [
	// 		{
	// 			expense_date: '05-03-2023',
	// 			expense_type: 'Operating',
	// 			description_expense: 'Karbol',
	// 			qty: 10,
	// 			unit_price: 25000,
	// 			subtotal: 250000
	// 		},
	// 		{
	// 			expense_date: '10-04-2023',
	// 			expense_type: 'Repairment',
	// 			description_expense: 'Servis AC',
	// 			qty: 0,
	// 			unit_price: 0,
	// 			subtotal: 300000
	// 		}
	// 	],
	// 	grand_total: 550000,
	// 	items: [
	// 		{
	// 			name: 'Kos Gunung Muria',
	// 			price: 900000
	// 		},
	// 		{
	// 			name: 'Kos Gunung Semeru',
	// 			price: 1200000
	// 		},
	// 		{
	// 			name: 'Cleaning Service',
	// 			price: 400000
	// 		}
	// 	],
	// 	subTotal: 2500000,
	// 	feeProcess: 4000,
	// 	grandTotal: 2504000
	// }
	if (req.method === 'POST') {
		try {
			// console.log('tampilin dong')
			const binaryResult = await createPdf(data)
			res
				.setHeader('Content-Type', 'application/pdf')
				// .setHeader('Content-disposition', 'attachment; filename=report.pdf')
				.send(binaryResult)
		} catch (error) {
			res.send(errorPdfHtmlTemplate(error.message))
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
