import { LRUCache } from 'lru-cache'
const ssrCache = new LRUCache({
	max: 500,
	maxAge: 1000 * 60 * 30 // 30min
})
export default ssrCache
