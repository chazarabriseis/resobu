import React from 'react'
import { Button} from '@material-ui/core'
import { withRouter } from "react-router";

import SubscriptionTradeshow from './SubscriptionTradeshow'
import WhatDiagramConference from './WhatDiagramConference'
import WhyTradeshow from './WhyTradeshow'

import './Home.css'
import '../../App.css'


class HomeTradeshow extends React.Component {
  
  gotoSignUp = (value) => {
    this.props.onsetGroupType('Tradeshow')
    this.props.onSetSubscription(value)
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's make sure people connnect at your tradeshow</div>
          <div className="heading2">Remote Social Butterfly automatically organises random or coordinated chats to enable networking, knowledge transfer and an innovative culture.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhyTradeshow />  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhatDiagramConference />  
        </div>
        <div className="infoBox infoBoxWhitePlans"> 
          <SubscriptionTradeshow 
            onGotoSignUp = {this.gotoSignUp}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(HomeTradeshow);
