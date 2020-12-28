export function setError (state, data) {
  state.error = data
}
export  function setLogged(state, status) {
  state.isLogged = status
}
export function setUser (state, payload) {
  state.user = payload
}
export function setAvatar(state, payloads) {
  state.user.avatar = payloads
}
