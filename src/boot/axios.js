import axios from 'axios'

const  token = localStorage.getItem('AuthToken')

export default async ({Vue}) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/json'

  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Auth-Token'] = token
  }
}
