import axios from 'axios'

const request = axios.create({
  baseURL: 'http://we.shanyue.tech'
})

export default request