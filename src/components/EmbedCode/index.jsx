// monaco editor supported language => https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages
import Editor from '@monaco-editor/react'
import { Card } from 'antd'
import { useEffect, useState } from 'react'

const EmbedCode = ({ url }) => {
	const [fileContent, setFileContent] = useState('')
	const fetchData = async () => {
		if (!!url) {
			fetch(url)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Failed to fetch raw content. Status: ${response.status}`)
					}
					return response.text()
				})
				.then((data) => {
					setFileContent(data)
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}
	useEffect(() => {
		fetchData()
	})
	return (
		<>
			<Card bodyStyle={{ padding: '0px' }}>
				<Editor
					options={{
						readOnly: true,
						scrollBeyondLastLine: false
					}}
					loading="loading..."
					height="40rem"
					theme="vs"
					defaultLanguage="javascript"
					defaultValue={fileContent}
				/>
			</Card>
		</>
	)
}
export default EmbedCode
