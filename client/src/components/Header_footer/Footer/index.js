import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

const Footer = () => {
  return (
    <footer className='bck_b_dark'>
      <div className='container'>
        <div className='logo'>
          Waves
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
                    <div>123 Street</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faPhone}
                    className="icon"
                />
                <div className="nfo">
                    <div>Phone</div>
                    <div>021-8763645</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faClock}
                    className="icon"
                />
                <div className="nfo">
                    <div>Working hours</div>
                    <div>Mon-Friday 09-18:00</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    className="icon"
                />
                <div className="nfo">
                    <div>Email</div>
                    <div>john@email.com</div>
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

export default Footer