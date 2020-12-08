import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../Pages/Home/Home.css'

library.add(fas)


class WhyForWho extends React.Component {

  render () {
    return(
      <div>
        <div className='heading3'>Where can ReSoBu help: </div>
        <div className="container planContainer">
          <div className="who-grid">
            <div className="whoTitle plan one">
                <div className="whoHeading"> In Organizations </div>
            </div>
            <div className="whoTitle plan five">
                <div className="whoHeading"> At Events </div>
            </div>
            <div className="whoIcon plan two">
              <FontAwesomeIcon icon='building'/> 
            </div>
            <div className="whoIcon plan six">
              <FontAwesomeIcon icon='link'/> 
            </div>
            <div className="whoText plan three">
                <div className="planText"> 
                  Global pandemic, different office locations, onboarding - all circumstances where communication is crucuial but difficult to establish. 
                  ReSoBu can help to organise meaningful chats tailored to your circumstances to make sure communication is thriving.
                </div>
            </div>
            <div className="whoText plan seven">
                <div className="planText">
                    Remote Conferences, attendees not mingling - people join events because of networking but it suffers in these circumstances.
                    ReSoBu will organise meaningful chats to foster networking distinguishing your event from others.
                </div>
            </div>
            <div className="planCTA plan whoButton four">
              <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/business/')}}>Use Cases &amp; Pricing </Button>  
            </div>
            <div className="planCTA plan whoButton eight">
              <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/conference/')}}>Use Cases &amp; Pricing</Button>  
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(WhyForWho);
