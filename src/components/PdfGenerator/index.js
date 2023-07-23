import PdfPrinter from 'pdfmake'
import invoice from './invoice'
import { Roboto } from './fonts'

export const createPdf = async (data) => {
	const printer = new PdfPrinter({ Roboto })
	const pdfDoc = printer.createPdfKitDocument(invoice(data))
	return new Promise((resolve, reject) => {
		try {
			const chunks = []
			pdfDoc.on('data', (chunk) => chunks.push(chunk))
			pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
			pdfDoc.end()
		} catch (err) {
			reject(err)
		}
	})
}

export const errorPdfHtmlTemplate = (error) => `
<h2>There was an error displaying the PDF document.</h2>
Error message: ${error}`
