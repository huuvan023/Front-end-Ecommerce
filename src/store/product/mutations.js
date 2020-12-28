export function setWoMen(state, data) {
  state.women = data
}
export function setMen(state, data) {
  state.men = data
}
export function setFavouriteItem(state,item) {
  //console.log("mutation: ", item)
  state.favouriteItem = item
}
export function setCartItem(state, item) {
  state.cartItem = item
}
export function setProduct(state,p) {
  state.product = p
}
