import axios from 'axios'
import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA
} from './types'
import { SITE_ROUTES } from '../components/utils/misc'

export function getSiteData() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${SITE_ROUTES}/site_data`)
      .then( res => {
        return res.data 
      })
      .then( res => {
        dispatch({
          type: GET_SITE_DATA,
          payload: res
        })
        resolve()
      })
      .catch( err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

export function updateSiteData(dataToSubmit) {
  // console.log('isi dataToSubmit: ', {dataToSubmit: dataToSubmit})
  return (dispatch) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${SITE_ROUTES}/site_data`, dataToSubmit)
      .then( res => res.data)
      .then( res => {
        dispatch({
          type: UPDATE_SITE_DATA,
          payload: res
        })
        resolve()
      })
      .catch( err => {
        console.error(err)
        reject(err)
      })
    })
  }
}