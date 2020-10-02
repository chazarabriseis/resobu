import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import './Home.css'
import '../../App.css'

import SubscriptionBusiness from '../../Components/HomePage/SubscriptionBusiness'
import WhatDiagram from '../../Components/HomePage/WhatDiagram'
import WhyBusiness from '../../Components/HomePage/WhyBusiness'

class HomeBusiness extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  gotoSignUp = (value) => {
    this.props.onsetGroupType('Business')
    this.props.onSetSubscription(value)
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's connect your team</div>
          <div className="heading2">Remote Social Butterfly automatically organises random or tailored chats to enable networking, knowledge transfer and an innovative culture.</div>
          <Button value= '-' className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhite"> 
          <WhyBusiness />           
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
