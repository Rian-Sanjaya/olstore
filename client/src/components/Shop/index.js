import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTop from '../utils/page_top'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import CollapseCheckbox from '../utils/collapseCheckbox'

class Shop extends Component {
  state = {
    grid: ''
  }

  render() {
    return (
      <div>
        <PageTop 
          title='Browse Products' 
        />
        <div className='container'>
          <div className='shop_wrapper'>

            <div className='left'>
              <CollapseCheckbox
                initState={true}
                title="Brands"
                // list={product.brands}
                handleFilters={(filters)=> this.handleFilters(filters,'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                // list={frets}
                handleFilters={(filters)=> this.handleFilters(filters,'frets')}
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                // list={product.woods}
                handleFilters={(filters)=> this.handleFilters(filters,'wood')}
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

export default connect()(Shop)