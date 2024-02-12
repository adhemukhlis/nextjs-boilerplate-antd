import { useRouter } from 'next/router'
import React from 'react'
const Index = ({ query }) => {
	const router = useRouter()
	const { pathname } = router
	return (
		<div>
			{JSON.stringify(query)}
			<button onClick={() => router.replace({ query: { path: 'hahaha' } })}>{pathname}</button>
		</div>
	)
}
export default Index

export const getServerSideProps = ({ query }) => {
	console.log(query)
	return {
		props: { query }
	}
}
