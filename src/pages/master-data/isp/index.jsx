import { useRouter } from 'next/router'
import React from 'react'
const Index = () => {
	const router = useRouter()
	const { pathname, asPath } = router
	return (
		<div>
			hehehe
			<button onClick={() => router.push({ pathname: pathname + '/add' })}>add</button>
			<button onClick={() => router.replace({pathname: pathname + '/detail/[path]', query: { path: 'nice' } })}>{`${pathname+ '/detail'}`}</button>
		</div>
	)
}
export default Index


