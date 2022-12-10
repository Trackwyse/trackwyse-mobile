import axios from 'axios'

const endpoint = 'https://trackerwind.in-staging.space'

const apiClient = axios.create({
  baseURL: endpoint,
})

const login = ({email, password}: LoginInput): Promise<LoginAPIResponse> => {
  return apiClient.post('/auth/v1/login', {
    email,
    password,
  })
}

export default {
  apiClient,
  login,
}

