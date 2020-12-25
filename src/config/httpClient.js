import axios from "axios";
const client = axios.create({
  baseURL: "https://localhost:44377"
});

async function get (url) {
  try {
    var token = {};
    if (localStorage.getItem('tokenString')) {
      token = {
        headers: {
          Authorization: localStorage.getItem('tokenString')
        }
      }
    }
    const response = await client.get(url,token);

    if (response.status === 200) {
        return response.data
    }
  }
  catch (error) {
    throw error
  }
}
async function post (url, data, config = {}) {
  try {
    var token = {};
    if (localStorage.getItem('tokenString')) {
      token = {
        headers: {
          Authorization: localStorage.getItem('tokenString')
        }
      }
    }
    const response = await client.post(url, data, {...token});

    if (response.status === 200) {
      return response.data
    }
  }
  catch (error) {
    throw error
  }
}

export const httpClient = {
  get,
  post
}
