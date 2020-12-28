import {httpClient} from "src/config/httpClient";

export async function getProductByType({commit}, type) {
  try {

    if( type === 'M' ) {
      await httpClient.post("/api/product/get-by-type",{idType:type})
        .then(data => {
          if (data.code === 1) {
            commit('setMen', data.data)
          }else {
            commit('notify/setNotify', {
              color: 'negative',
              message: 'Something was wrong!'
            }, { root: true })
          }
        })
        .catch(e => {
          commit('notify/setNotify', {
            color: 'negative',
            message: 'Something was wrong!'
          }, { root: true })
        })
    }
    if (type === "W") {
      await httpClient.post("/api/product/get-by-type",{idType:type})
        .then(data => {
          if (data.code ===1) {
            commit('setWoMen', data.data)
          }else {
            commit('notify/setNotify', {
              color: 'negative',
              message: 'Something was wrong!'
            }, { root: true })
          }
        })
        .catch(e => {
          commit('notify/setNotify', {
            color: 'negative',
            message: 'Something was wrong!'
          }, { root: true })
        })
    }
    /*if (data.name.trim() === "" || data.password.trim() === "") {
      commit('setError', 'Please type user name and password')
    }
    else {
      const response = await httpClient.get(`/user/${data.name}`);
      localStorage.setItem('login', true)
      localStorage.setItem('name', data.name)
      await commit('setUser', response)
    }*/
  }
  catch (error) {
    commit('setError', 'Something was wrong')
    commit('notify/setNotify', {
      color: 'negative',
      message: 'Something was wrong!'
    }, { root: true })
  }
}

export async function fetchProduct({commit},id) {
  await httpClient.post('/api/product/find-by-id', {
    idProduct: id.id
  })
    .then(data => {
      if(data.code === 1) {
        this.data = data.data
        commit("setProduct", this.data)
      }else {
        commit('notify/setNotify', {
          color: 'negative',
          message: 'Something was wrong!'
        }, { root: true })
      }
    })
    .catch(e => {
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something was wrong!'
      }, { root: true })
    })
}
