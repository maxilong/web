import { getVenueId } from '@/utils/auth'
const venueId = (state=getVenueId(), actions) => {
  switch(actions.type) {
    case 'CHANGE_VENUEID': return actions.venueId;
    default: return state;
  }
}
export default venueId