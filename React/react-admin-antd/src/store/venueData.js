import { getVenueData } from '@/utils/auth'
const venueId = (state=[], actions) => {
  switch(actions.type) {
    case 'CHANGE_VENUEDATA': return actions.venueData;
    default: return state;
  }
}
export default venueId