import axios from 'axios'
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS
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

export function getBrands() {
  return (dispatch) => {
    axios.get(`${PRODUCT_ROUTES}/brands`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: GET_BRANDS,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}

export function getWoods() {
  return (dispatch) => {
    axios.get(`${PRODUCT_ROUTES}/woods`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: GET_WOODS,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}