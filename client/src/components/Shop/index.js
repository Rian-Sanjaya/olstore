import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTop from '../utils/page_top'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import CollapseCheckbox from '../utils/collapseCheckbox'
import CollapseRadio from '../utils/collapseRadio'
import { getBrands, getWoods, getProductsToShop } from '../../actions/product_action'
import { frets, price } from './fixed_filters'
import LoadmoreCards from './loadmoreCards';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  }

  componentDidMount() {
    this.props.getBrands()
    this.props.getWoods()
    this.props.getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
  }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] = filters

    if (category === 'price') {
      let priceValues = this.handlePrice(filters)
      newFilters[category] = priceValues
    }

    this.showFilteredResults(newFilters)
    this.setState({
      filters: newFilters
    })
  }

  handlePrice = (value) => {
    const data = price
    let array = []
    
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }

    return array
  }

  showFilteredResults = (filters) => {
    this.props.getProductsToShop(
      0,
      this.state.limit,
      filters
    ).then( () => {
      this.setState({ skip: 0 })
    }).catch( err => {
      console.error(err)
    })
  }

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit
    
    this.props.getProductsToShop(
      skip, 
      this.state.limit, 
      this.state.filters, 
      this.props.product.toShop
    ).then( () => {
      this.setState({ skip })
    }).catch( err => {
      console.error(err)
    })
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    })
  }

  render() {
    const { product } = this.props
    
    return (
      <div>
        <PageTop 
          title='Browse Products' 
        />
        <div className='container'>
          <div className='shop_wrapper'>

            <div className='left'>
              <CollapseCheckbox
                initOpen={true}
                title="Brands"
                list={product.brands}
                handleFilters={(filters)=> this.handleFilters(filters,'brand')}
              />
              <CollapseCheckbox
                initOpen={false}
                title="Frets"
                list={frets}
                handleFilters={(filters)=> this.handleFilters(filters,'frets')}
              />
              <CollapseCheckbox
                initOpen={false}
                title="Wood"
                list={product.woods}
                handleFilters={(filters)=> this.handleFilters(filters,'wood')}
              />
              <CollapseRadio
                initOpen={true}
                title='Price'
                list={price}
                handleFilters={ (filters) => this.handleFilters(filters, 'price')}
              />
            </div>

            <div className='right'>
              <div className='shop_options'>
                <div className='shop_grids clear'>
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={ () => this.handleGrid() }
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={ () => this.handleGrid() }
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>

              <div style={{ clear: 'both' }}>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={product.toShopSize}
                  product={product.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    product: state.product
  }
}

const mapActionsToProps = {
  getBrands,
  getWoods,
  getProductsToShop
}

export default connect(mapStateToProps, mapActionsToProps)(Shop)