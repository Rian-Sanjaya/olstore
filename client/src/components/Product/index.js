import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTop from '../utils/page_top'
import { getProductDetail, clearProductDetail } from '../../actions/product_action'
import ProdImg from './prodImg'
import ProdNfo from './prodNfo'
import { addToCart } from '../../actions/user_action'

class ProductDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProductDetail(id)
    .then( res => {
      if (!this.props.product.prodDetail) {
        this.props.history.push('/')
      }
    })
  }

  componentWillUnmount() {
    this.props.clearProductDetail()
  }

  addToCartHandler(id) {
    this.props.addToCart(id)
  }

  render() {
    return (
      <div>
        <PageTop title='Product detail' />
        <div className='container'>
          {
            this.props.product.prodDetail ?
              <div className='product_detail_wrapper'>
                <div className='left'>
                  <div style={{ width: '500px' }}>
                    <ProdImg detail={this.props.product.prodDetail} />
                  </div>
                </div>

                <div className='right'>
                  <ProdNfo
                    addToCart={(id) => this.addToCartHandler(id)}
                    detail={this.props.product.prodDetail}
                  />
                </div>
              </div>

            : 'Loading'
          }
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
  getProductDetail,
  clearProductDetail,
  addToCart
}

export default connect(mapStateToProps, mapActionsToProps)(ProductDetail)