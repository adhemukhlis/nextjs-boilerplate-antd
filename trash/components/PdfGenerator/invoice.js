import idrFormatter from '@/utils/idrFormatter'

const invoice = (data) => ({
	content: [
		{
			columns: [
				[
					{
						text: `Nama Property :  ${data.property_name}`,
						bold: true,
						color: '#333333',
						alignment: 'left'
					},
					'\n',
					{
						text: `Periode :  ${data.periode}`,
						bold: true,
						color: '#333333',
						alignment: 'left'
					}
				],
				{
					image:
						'data:image/png;base64,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',
					width: 120
				}
			]
		},
		'\n\n',
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 10
				},
				paddingRight: function (i, node) {
					return 10
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', '*'],
				body: [
					[
						{
							text: 'BILLING COMMISION',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: 'NILAI',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Old Tenant (${data.billing.old_tenant_commission_pct}%)`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.billing.old_tenant_commission),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `NewTenant (${data.billing.new_tenant_commission_pct}%)`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.billing.new_tenant_commission),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Reimbursement Expense`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.billing.reimbursement_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: 'Total Billing',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.billing.total_billing),
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					]
				]
			}
		},
		'\n\n',
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 10
				},
				paddingRight: function (i, node) {
					return 10
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', '*'],
				body: [
					[
						{
							text: 'INCOME STATEMENT',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: 'NILAI',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Rent Revenue`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.revenue.rent_revenue),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Parking Revenue`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.revenue.parking_revenue),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Other`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.revenue.others),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: 'TOTAL REVENUE',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.revenue.total_revenue),
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					]
				]
			}
		},
		'\n,\n',
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 10
				},
				paddingRight: function (i, node) {
					return 10
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', '*'],
				body: [
					[
						{
							text: 'EXPENSES',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: 'NILAI',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Operating Expenses`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.operating_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Environment Expenses`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.environment_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Maintance & Repairment Expenses`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.maintenance_repairment_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Salary Expenses`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.salary_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: `Other Expenses`,
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.other_expense),
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: 'TOTAL EXPENSES',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.expense.total_expense),
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					],
					[
						{
							text: 'FINAL NET INCOME',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'left',
							textTransform: 'uppercase'
						},
						{
							text: idrFormatter(data.income_statement.net_income),
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							alignment: 'left',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					]
				]
			}
		},
		'\n\n\n',
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 5
				},
				paddingRight: function (i, node) {
					return 5
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: [20, 60, 60, 65, 65, 65, '*'],
				body: [
					[
						{
							text: 'NO',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 2, 0, 2],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: 'TENANT NAME',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'ROOM',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'DEPOSIT',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'PARKING',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'OTHERS',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'KETERANGAN',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						}
					],
					...data.income_details.map((item) => [
						{
							text: item.no,
							border: [true, false, false, true],
							margin: [0, 2, 0, 2],
							alignment: 'left'
						},
						{
							text: item.tenant_name,
							border: [true, false, false, true],
							margin: [0, 2, 0, 2],
							alignment: 'left'
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.room),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.deposit),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.parking),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.others),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: item.keterangan,
							alignment: 'right',
							margin: [0, 2, 0, 2]
						}
					])
				]
			}
		},

		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 10
				},
				paddingRight: function (i, node) {
					return 10
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', '*'],
				body: [
					[
						{
							text: 'TOTAL INCOME',
							fillColor: '#eaf2f5',
							border: [true, false, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: `${data.total_income}`,
							border: [true, false, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					]
				]
			}
		},
		'\n\n\n',
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 5
				},
				paddingRight: function (i, node) {
					return 5
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', 65, 60, 40, 65, '*'],
				body: [
					[
						{
							text: 'Expenses Date',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 2, 0, 2],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: 'Expenses Type',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'Desription Expense',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'Qty',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'Unit Price',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						},
						{
							text: 'Sub Total',
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 2, 0, 2],
							textTransform: 'uppercase'
						}
					],
					...data.expense_details.map((item) => [
						{
							text: item.expense_date,
							border: [true, false, false, true],
							margin: [0, 2, 0, 2],
							alignment: 'left'
						},
						{
							text: item.expense_type,
							border: [true, false, false, true],
							margin: [0, 2, 0, 2],
							alignment: 'left'
						},
						{
							text: item.description_expense,
							border: [false, false, true, true],
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							text: item.qty,
							border: [false, false, true, true],
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.unit_price),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						},
						{
							border: [false, false, true, true],
							text: idrFormatter(item.subtotal),
							alignment: 'right',
							margin: [0, 2, 0, 2]
						}
					])
				]
			}
		},
		{
			layout: {
				defaultBorder: false,
				hLineWidth: function (i, node) {
					return 1
				},
				vLineWidth: function (i, node) {
					return 1
				},
				hLineColor: function (i, node) {
					if (i === 1 || i === 0) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				vLineColor: function (i, node, columnIndex) {
					if ((i === 0 && columnIndex === 0) || (i === node.table.widths.length && columnIndex === 0)) {
						return '#bfdde8'
					}
					return '#eaeaea'
				},
				hLineStyle: function (i, node) {
					return null
				},
				paddingLeft: function (i, node) {
					return 10
				},
				paddingRight: function (i, node) {
					return 10
				},
				paddingTop: function (i, node) {
					return 2
				},
				paddingBottom: function (i, node) {
					return 2
				},
				fillColor: function (rowIndex, node, columnIndex) {
					return '#fff'
				}
			},
			table: {
				headerRows: 1,
				widths: ['*', '*'],
				body: [
					[
						{
							text: 'GRAND TOTAL',
							fillColor: '#eaf2f5',
							border: [true, true, true, true],
							margin: [0, 5, 0, 5],
							alignment: 'center',
							textTransform: 'uppercase'
						},
						{
							text: `${data.grand_total}`,
							border: [true, true, true, true],
							alignment: 'center',
							fillColor: '#eaf2f5',
							margin: [0, 5, 0, 5],
							textTransform: 'uppercase'
						}
					]
				]
			}
		},
		'\n'
		// {
		// 	text: 'NOTES',
		// 	style: 'notesTitle'
		// },
		// {
		// 	text: 'Some notes goes here \n Notes second line',
		// 	style: 'notesText'
		// }
	],
	styles: {
		notesTitle: {
			fontSize: 10,
			bold: true,
			margin: [0, 50, 0, 3]
		},
		notesText: {
			fontSize: 10
		}
	},
	defaultStyle: {
		columnGap: 20
	}
})

export default invoice
