import { Card, Form, Select, Typography } from 'antd'
import EmbedCode from '@/components/EmbedCode'

const { Title } = Typography
// qs.stringify(newSearch, { addQueryPrefix: true })
// qs.parse(search, { ignoreQueryPrefix: true })
const ComponentsAutoCompletePage = () => {
	const provinceData = [
		{ label: 'Ontario', value: 'ON' },
		{ label: 'Quebec', value: 'QC' },
		{ label: 'British Columbia', value: 'BC' },
		{ label: 'Alberta', value: 'AB' },
		{ label: 'Manitoba', value: 'MB' },
		{ label: 'Saskatchewan', value: 'SK' },
		{ label: 'Nova Scotia', value: 'NS' },
		{ label: 'New Brunswick', value: 'NB' },
		{ label: 'Newfoundland and Labrador', value: 'NL' },
		{ label: 'Prince Edward Island', value: 'PE' },
		{ label: 'Northwest Territories', value: 'NT' },
		{ label: 'Yukon', value: 'YT' },
		{ label: 'Nunavut', value: 'NU' }
	]

	return (
		<>
			<Title level={4}>Auto Complete</Title>
			<Card>
				<Form
					autoComplete="off"
					layout="vertical"
					colon={false}
					style={{
						width: '100%'
					}}>
					<Form.Item name="example" label="Example" rules={[{ required: true, message: 'This field is required' }]}>
						<Select
							options={provinceData}
							showSearch
							allowClear
							placeholder="Pilih Provinsi"
							filterOption={(inputValue, option) => option.label.toLowerCase().includes(inputValue.toLowerCase())}
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Form>
			</Card>
			<Card style={{ marginTop: '1rem' }}>
				<EmbedCode url="https://raw.githubusercontent.com/adhemukhlis/nextjs-boilerplate-antd/main/src/pages/components/autoComplete/index.jsx" />
			</Card>
		</>
	)
}
export default ComponentsAutoCompletePage
