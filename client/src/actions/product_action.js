import axios from 'axios'
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_BRANDS,
  GET_WOODS,
  ADD_BRAND,
  ADD_WOOD
} from './types'
import { PRODUCT_ROUTES } from '../components/utils/misc'
// import add_product from '../components/User/Admin/add_product';

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

export function getProductsToShop(skip, limit, filters=[], previousState=[]) {
  const data = {
    limit,
    skip,
    filters
  }

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${PRODUCT_ROUTES}/shop`, data)
      .then( res => {
        let newState = [
          ...previousState,
          ...res.data.articles
        ]
  
        return {
          size: res.data.size,
          articles: newState
        }
      })
      .then( res => {
        dispatch({
          type: GET_PRODUCTS_TO_SHOP,
          payload: res
        })

        resolve()
      })
      .catch( err => {
        console.log(err)
        reject(err) 
      })
    })
  }
}

export function getBrands() {
  return (dispatch) => { 
    return new Promise((resolve, reject) => {

      axios.get(`${PRODUCT_ROUTES}/brands`)
      .then( res => {
        return res.data 
      })
      .then( res => {
        dispatch({
          type: GET_BRANDS,
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

export function getWoods() {
  return (dispatch) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${PRODUCT_ROUTES}/woods`)
      .then( res => res.data )
      .then( res => {
        dispatch({
          type: GET_WOODS,
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

export function addProduct(dataToSubmit) {
  return (dispatch) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${PRODUCT_ROUTES}/article`, dataToSubmit)
      .then( res => {
        return res.data
      })
      .then( res => {
        dispatch({
          type: ADD_PRODUCT,
          payload: res
        })
        resolve()
      })
      .catch( err => {
        console.log(err)
        reject(err) 
      })
    })
  }
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}

export function addBrand(dataToSubmit, existingBrands) {
  return (dispatch) => {
    return new Promise(( resolve, reject) => {
      axios.post(`${PRODUCT_ROUTES}/brand`, dataToSubmit)
      .then( res => {
        let brands = [
          ...existingBrands,
          res.data.brand
        ]

        return {
          success: res.data.success,
          brands
        }
      })
      .then( res => {
        dispatch({
          type: ADD_BRAND,
          payload: res
        })

        resolve(res)
      })
      .catch( err => {
        console.err(err)
        reject(err)
      })
    })
  }
}

export function addWood(dataToSubmit, existingWoods) {
  return (dispatch) => {
    return new Promise(( resolve, reject ) => {
      axios.post(`${PRODUCT_ROUTES}/wood`, dataToSubmit)
      .then( res => {
        let woods = [
          ...existingWoods,
          res.data.wood
        ]

        return {
          success: res.data.success,
          woods
        }
      })
      .then( res => {
        dispatch({
          type: ADD_WOOD,
          payload: res
        })

        resolve(res)
      })
      .catch( err => {
        console.err(err)
        reject(err)
      })
    })
  }
}

export function getProductDetail(id) {
  return (dispatch) => {
    return new Promise(( resolve, reject ) => {
      axios.get(`${PRODUCT_ROUTES}/articles_by_id?id=${id}&type=single`)
      .then( res => {
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: res.data[0]
        })

        resolve(res.data[0])
      })
      .catch( err => {
        console.error(err)
        reject(err) 
      })
    })
  }
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  }
}