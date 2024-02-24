import axios from 'axios'

const internalService = axios.create({
	baseURL: 'http://localhost:' + process.env.PORT ?? '3000'
})

export default internalService
