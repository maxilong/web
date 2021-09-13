const preCode = (state='', actions) => {
  switch(actions.type) {
    case 'CHANGE_PRECODE': return actions.preCode;
    default: return state;
  }
}
export default preCode