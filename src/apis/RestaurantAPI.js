import axios from 'axios'

export default axios.create({
  baseURL: "http://localhost:3080/api/v1/restaraunts"
})