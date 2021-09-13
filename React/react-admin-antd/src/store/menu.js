function filterMenu(state, menuData) {
  let count = 0
  state.map(item => {
    if (item.path === menuData.path) {
      count++ 
    }
  })
  if (!count) {
    state.push(menuData)
  }
}
function deleteMenu(state, menuData) {
  let count = undefined
  state.map((item, index) => {
    if (item.path === menuData.path) {
      count = index
    }
  })
  if (count) {
    state.splice(count, 1)
  }
}
const menu = (state=[], actions) => {
  switch(actions.type) {
    case 'ADD_MENU': filterMenu(state, actions.menuData); return state;
    case 'DEL_MENU': deleteMenu(state, actions.menuData); return state;
    default: return state;
  }
}
export default menu