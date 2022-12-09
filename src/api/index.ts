import axios from 'axios'

const endpoint = ''

const signIn = async (email: string, password: string): Promise<string> => {

  const response = await axios.post(`${endpoint}/auth/v1/login`, {
    email,
    password,
  })

  return response.data.accessToken as string

}
