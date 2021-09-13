const TokenKey = 'token'
const Userkey = 'userData'
const VenueData = 'venueData'
const VenueId = 'venueId'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUserData() {
  return JSON.parse(localStorage.getItem(Userkey))
}

export function setUserData(obj) {
  return localStorage.setItem(Userkey, JSON.stringify(obj))
}

export function removeUserData() {
  return localStorage.removeItem(Userkey)
}

export function getVenueData() {
  return JSON.parse(localStorage.getItem(VenueData))
}

export function setVenueData(obj) {
  return localStorage.setItem(VenueData, JSON.stringify(obj))
}

export function removeVenueData() {
  return localStorage.removeItem(VenueData)
}

export function getVenueId() {
  return localStorage.getItem(VenueId)
}

export function setVenueId(id) {
  return localStorage.setItem(VenueId, id)
}

export function removeVenueId() {
  return localStorage.removeItem(VenueId)
}