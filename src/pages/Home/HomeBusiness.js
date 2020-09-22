import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import './Home.css'
import '../../App.css'

import SubscriptionBusiness from './SubscriptionBusiness'
import WhatDiagram from './WhatDiagram'

class HomeBusiness extends React.Component {

  gotoSignUp = () => {
    this.props.onsetGroupType('Business')
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's connect your team</div>
          <div className="heading2">Remote Social Butterfly automatically organises random or tailored chats to enable networking, knowledge transfer and an innovative culture.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhatDiagram />  
        </div>
        <div className="infoBox infoBoxWhitePlans"> 
          <SubscriptionBusiness 
           onGotoSignUp = {this.gotoSignUp}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(HomeBusiness);
