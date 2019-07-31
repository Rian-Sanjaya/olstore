import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA
} from '../actions/types'

export default function(state={}, acttion) {
  switch(acttion.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: acttion.payload
      }

    case UPDATE_SITE_DATA:
      return {
        ...state,
        siteData: acttion.payload.siteInfo
      }
      
    default:
      return state
  }
}