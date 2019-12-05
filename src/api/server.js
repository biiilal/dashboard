import axios from 'axios'

export default axios.create ({
  // baseURL: 'http://localhost:3000'
  baseURL : 'https://cors-anywhere.herokuapp.com/mengsynergokan.synergo.co/api/reports'
})