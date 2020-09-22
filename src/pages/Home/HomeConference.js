import React from 'react'
import { Button} from '@material-ui/core'
import { withRouter } from "react-router";

import SubscriptionConference from './SubscriptionConference'
import WhatDiagram from './WhatDiagram'

import './Home.css'
import '../../App.css'


class HomeConference extends React.Component {

  gotoSignUp = () => {
    this.props.onsetGroupType('Conference')
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's enable networking at your conference</div>
          <div className="heading2">Remote Social Butterfly automatically organises random or tailored chats to enable networking, knowledge transfer and an innovative culture.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhatDiagram />  
        </div>
        <div className="infoBox infoBoxWhitePlans"> 
          <SubscriptionConference 
            onGotoSignUp = {this.gotoSignUp}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(HomeConference);
