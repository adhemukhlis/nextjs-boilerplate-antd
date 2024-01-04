import XLSX from 'xlsx'

export const createXlsx = async (data) => {
	const workBook = XLSX.utils.book_new()
	const workSheet = XLSX.utils.json_to_sheet(data)
	XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1', true)
	const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })
	return new Promise((resolve, reject) => {
		try {
			resolve(buffer)
		} catch (err) {
			reject(err)
		}
	})
}
