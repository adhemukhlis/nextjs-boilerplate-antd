import dayjs from 'dayjs'
import { createXlsx } from '../../../ExcelGenerator'

const api = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const binaryResult = await createXlsx([
				{ name: 'Diary', code: 'diary_code', author: 'Pagorn' },
				{ name: 'Note', code: 'note_code', author: 'Pagorn' },
				{ name: 'Medium', code: 'medium_code', author: 'Pagorn' }
			])
			res
				.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
				.setHeader('Content-Disposition', `attachment; filename=ListSaran_${dayjs().format('DDMMYY_HHmmss')}.xlsx`)
				.send(binaryResult)
		} catch (error) {
			res.send('failed to generate data to Excel')
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
}
export default api
