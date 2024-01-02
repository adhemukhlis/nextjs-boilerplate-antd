import { Card, Typography, Row, Col } from 'antd'
import Link from 'next/link'

const { Title } = Typography

const items = [
	{
		label: 'Forms',
		value: 'forms'
	},
	{
		label: 'Auto Complete',
		value: 'autoComplete'
	},
	
]
const ItemComponent = ({ item: { label, value } }) => (
	<Link href={`/components/${value}`}>
		<Card>
			<Title level={4}>{label}</Title>
		</Card>
	</Link>
)

const ComponentsPage = () => {
	return (
		<>
			<Row gutter={[24, 24]}>
				{items.map((item, index) => (
					<Col key={index} span={6}>
						<ItemComponent item={item} />
					</Col>
				))}
			</Row>
		</>
	)
}
export default ComponentsPage
