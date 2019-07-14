import React, { Component } from 'react';
import { connect } from 'react-redux'
import HomeSlider from './home_slider'
import HomePromotion from './home_promotion'
import CardBlock from '../utils/card_block'
import { getProductBySell, getProductByArrival } from '../../actions/product_action'

class Home extends Component {
  componentDidMount() {
    this.props.getProductBySell()
    this.props.getProductByArrival()
  }

  render() {
    const { bySell, byArrival } = this.props
    
    return (
      <div>
        <HomeSlider />
        <CardBlock 
          title='Best Selling Guitars'
          list={bySell}
        />
        <HomePromotion />
        <CardBlock
          title='New arrivals'
          list={byArrival}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    bySell: state.product.bySell,
    byArrival: state.product.byArrival
  }
}

const mapActionsToProps = {
  getProductBySell,
  getProductByArrival
}

export default connect(mapStateToProps, mapActionsToProps)(Home)