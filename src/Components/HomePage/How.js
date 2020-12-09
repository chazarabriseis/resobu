import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../Pages/Home/Home.css'

library.add(fas)

class How extends React.Component {

  render () {
    return(
      <div>
        <div className='heading3'>ReSoBu's Connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance - Data-driven chat partner selection</div>
        <div className="container stepContainer">
          <div className="how-grid">
            <div className="how-input one">
              <div className="container stepContainer">
                <div className="input-grid">
                  <div className="main-input one-input">
                    People Data
                  </div>
                  <div className="main-input four-input">
                    Constraints
                  </div>
                  <div className="main-input seven-input">
                    Chat Info
                  </div>
                  <div className="list-input two-input">
                    Email
                  </div>
                  <div className="list-input five-input">
                    Who should meet
                  </div>
                  <div className="list-input eight-input">
                    Chat Time
                  </div>
                  <div className="list-input three-input">
                    Attributes 
                  </div>
                  <div className="list-input six-input">
                    Who should not meet
                  </div>
                  <div className="list-input nine-input">
                    Chat Size
                  </div>
                </div>
              </div>
            </div>
            <div className="how-connector two">
              <FontAwesomeIcon icon='chevron-right'/> 
            </div>
            <div className="how-image three">
              <img alt="howIcon" className= "responsive-image" src="butterfly_transformation.png" />
            </div>
            <div className="how-connector four">
              <FontAwesomeIcon icon='chevron-right'/> 
            </div>
            <div className="how-output five">
                Tailored Chat Groups will be formed and automated invites sent out
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default How;
