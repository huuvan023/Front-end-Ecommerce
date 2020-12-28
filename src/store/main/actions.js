import {httpClient} from "src/config/httpClient";

export function onLogin ({ commit }, data) {
  console.log(data)
}

export async function fetchAllCate({commit}) {
  await httpClient.get('/api/product-category/all')
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('category', JSON.stringify(data.data))
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}
export async function fetchAllType({commit}) {
  await httpClient.get('/api/product-type/all')
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('type', JSON.stringify(data.data))
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}

export async function fetchAllSize({commit}) {
  await httpClient.get('/api/product-size/all')
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('size', JSON.stringify(data.data))
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}
export async function fetchAllColor({commit}) {
  await httpClient.get('/api/product-color/all')
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('color', JSON.stringify(data.data))
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}
export async function fetchAllBrand({commit}) {
  await httpClient.get('/api/product-brand/all')
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('brand', JSON.stringify(data.data))
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}
