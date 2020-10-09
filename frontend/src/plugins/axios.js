import axios from 'axios'

export default axios.create({ baseURL: `http://${location.hostname}:50000/` })

export const BASE_API_PATH = '/api/', ACCESS_TOKEN_LIFETIME = 5 * 60 * 1000
