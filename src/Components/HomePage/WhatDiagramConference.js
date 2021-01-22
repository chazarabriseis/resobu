import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../Pages/Home/Home.css'

library.add(fas)

class WhatDiagram extends React.Component {

  render () {
    return(
      <div>
        <div className="heading3">Workflow:</div>
        <div className="container stepContainer">
          <div className="what-grid">
            <div className="step one">
              <FontAwesomeIcon icon='table'/> 
              <div className="stepText">Upload emails</div>
            </div>
            <div className="connector two">
            </div>
            <div className="step three">
              <FontAwesomeIcon icon='globe'/> 
              <div className="stepText">Optional: Feed the connection AIssitance</div>
            </div>
            <div className="connector four">
            </div>
            <div className="step five">
              <FontAwesomeIcon icon='calendar-alt'/>
              <div className="stepText">Set remote social butterfly chat times</div>
            </div>
            <div className="connector six">
            </div>
            <div className="step seven">
              <FontAwesomeIcon icon='envelope-open-text'/>
              <div className="stepText">Draft an invite</div>
            </div>
            <div className="connector eight">
            </div>
            <div className="step nine">
              <FontAwesomeIcon icon='users'/>
              <div className="stepText">Remote Social Butterfly tailors and organises chats</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WhatDiagram;
