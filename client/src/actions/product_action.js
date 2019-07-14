import axios from 'axios'
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL
} from './types'
import { PRODUCT_ROUTES } from '../components/utils/misc'

export const getProductBySell = () => {
  return (dispatch) => {
    axios.get(`${PRODUCT_ROUTES}/articles?sortBy=sold&order=desc&limit=4`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: GET_PRODUCTS_BY_SELL,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}

export function getProductByArrival() {
  return (dispatch) => {
    axios.get(`${PRODUCT_ROUTES}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}