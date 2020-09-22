import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './Home.css'

library.add(fas)

class WhatDiagram extends React.Component {

  render () {
    return(
        <div className="container stepContainer">
          <div className="step">
            <div className="stepText" style={{ marginRight: '40px' }}>What is involved:</div>
          </div>
          <div className="step">
            <FontAwesomeIcon icon='table'/> 
            <div className="stepText">Upload emails</div>
          </div>
          <div className="connector">
            <hr/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon='globe'/> 
            <div className="stepText">Optional: Feed the connection and learning AIssitance with data</div>
          </div>
          <div className="connector">
            <hr/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon='calendar-alt'/>
            <div className="stepText">Set social butterfly chat times</div>
          </div>
          <div className="connector">
            <hr/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon='envelope-open-text'/>
            <div className="stepText">Draft an invite for the chats</div>
          </div>
          <div className="connector">
            <hr/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon='users'/>
            <div className="stepText">Let us do the rest to connect people</div>
          </div>
        </div>
    )
  }
}

export default WhatDiagram;
