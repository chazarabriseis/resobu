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
        <div className='heading3'>Remote Social Butterfly's (ReSoBu) data-driven agile workflow:</div>
        <div className="container stepContainer">
              <img alt="howIcon" className="responsive-image" src="resobu_workflow.png" />
        </div>
      </div>
    )
  }
}

export default How;
