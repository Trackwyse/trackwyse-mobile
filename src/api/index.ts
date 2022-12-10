import axios from 'axios'

const endpoint = 'https://trackerwind.in-staging.space'

export default axios.create({
  baseURL: endpoint,
})
