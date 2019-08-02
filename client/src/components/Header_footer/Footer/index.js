import React from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

const Footer = (props) => {

  const siteData = props.site.siteData ? props.site.siteData[0] : {}

  return (
    <footer className='bck_b_dark'>
      <div className='container'>
        <div className='logo'>
          OLStore
        </div>

        <div className='wrapper'>
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon
                    icon={faCompass}
                    className="icon"
                />
                <div className="nfo">
                    <div>Address</div>
                    <div>{siteData.address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faPhone}
                    className="icon"
                />
                <div className="nfo">
                    <div>Phone</div>
                    <div>{siteData.phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faClock}
                    className="icon"
                />
                <div className="nfo">
                    <div>Working hours</div>
                    <div>{siteData.hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    className="icon"
                />
                <div className="nfo">
                    <div>Email</div>
                    <div>{siteData.email}</div>
                </div>
              </div>
            </div>
          </div> 
          <div className="right">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers.You can miss out.
              </div>
            </div>
          </div>      
        </div>
      </div>
    </footer>
  )
}

const mapStateToProps = (state, props) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Footer)