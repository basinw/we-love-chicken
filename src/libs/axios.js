import axios from 'axios'

let instance = axios.create({
  baseURL: `http://localhost:3001/api/v1`
})

export default instance