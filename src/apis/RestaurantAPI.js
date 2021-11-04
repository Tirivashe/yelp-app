import axios from 'axios'

export default axios.create({
  baseURL: "https://yelp-app-server.herokuapp.com/api/v1/restaraunts"
})