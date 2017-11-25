import axios from 'axios'

let instance = axios.create({
  baseURL: `http://bassup.tk:3000/api/v1`
})

export default instance
