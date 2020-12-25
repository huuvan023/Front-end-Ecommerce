import {httpClient} from "src/config/httpClient";

export async function onLogin ({ commit, dispatch}, data) {
  try {
    if (data.name.trim() === "" || data.password.trim() === "") {
      commit('setError', 'Please type user name and password')
    }
    else {
      const response = await httpClient.get(`/user/${data.name}`);
      localStorage.setItem('login', true)
      localStorage.setItem('name', data.name)
      await commit('setUser', response)
    }
  }
  catch (error) {
    commit('setError', 'Something was wrong')
    commit('notify/setNotify', {
      color: 'negative',
      message: 'Something was wrong!'
    }, { root: true })
  }
}

export  async function  logOut({ commit }) {
  try {
    localStorage.removeItem('login')
    localStorage.removeItem('name')
    this.$router.replace('/login')
  }
  catch (error) {
    throw error
  }
}

export async  function  resetPassword({commit}, data) {
  await httpClient.post('/api/user/reset-password',{ email: data.email  })
  .then(data => {
    if (data.code === 1) {
      commit('notify/setNotify', {
        color: 'positive',
        message: 'Send mail success! Please check your email!'
      }, { root: true })
    }
    else {
      commit('notify/setNotify', {
        color: 'negative',
        message: data.message,
      }, { root: true })
    }
  })
    .catch(e =>{
      commit('notify/setNotify', {
        color: 'negative',
        message: 'Something went wrong!'
      }, { root: true })
    })
}
export  async function fetchUser({commit}, data) {
  if(localStorage.getItem('tokenString')) {
    await httpClient.get("/api/user/infor")
      .then(data => {
        if (data.code === 1) {
          commit('setUser', data.data);
          commit('setLogged', true)
        }
        else {
          commit('notify/setNotify', {
            color: 'negative',
            message: 'Session expired!!!'
          }, { root: true })
          commit('setLogged', false)
          if (this.$router.currentRoute.fullPath.includes('/user')) {
            this.$router.replace('/login')
          }
        }
      })
      .catch(e =>{
        commit('setLogged', false)
        commit('notify/setNotify', {
          color: 'negative',
          message: 'Something went wrong!'
        }, { root: true })
        if (this.$router.currentRoute.fullPath.includes('/user')) {
          this.$router.replace('/login')
        }
      })
  }
  else {
    commit('setLogged', false)
    commit('notify/setNotify', {
      color: 'negative',
      message: 'Session expired!!'
    }, { root: true })
    if (this.$router.currentRoute.fullPath.includes('/user')) {
      this.$router.replace('/login')
    }
  }
}

export async function updateUser({commit},data) {
  console.log(data)
  await httpClient.post("/api/user/update", data)
    .then(data => {
      if (data.code === 1) {
        commit('notify/setNotify', {
          color: 'positive',
          message: 'Update success!'
        }, { root: true })
      }
      else {
        commit('notify/setNotify', {
          color: 'negative',
          message: data.message,
        }, { root: true })
      }
    })
}
