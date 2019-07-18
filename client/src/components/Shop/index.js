import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTop from '../utils/page_top'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import CollapseCheckbox from '../utils/collapseCheckbox'
import CollapseRadio from '../utils/collapseRadio'
import { getBrands, getWoods } from '../../actions/product_action'
import { frets, price } from './fixed_filters'

class Shop extends Component {
  state = {
    grid: ''
  }

  componentDidMount() {
    this.props.getBrands()
    this.props.getWoods()
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
                    onClick={() => {}}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={ () => {} }
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>

              <div style={{ clear: 'both' }}>
                Loadmorecard
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
  getWoods
}

export default connect(mapStateToProps, mapActionsToProps)(Shop)