import React from 'react'
import { Button} from '@material-ui/core'
import { withRouter } from "react-router";

import SubscriptionTradeshow from '../../Components/HomePage/SubscriptionTradeshow'
import WhatDiagramConference from '../../Components/HomePage/WhatDiagramConference'
//import WhyTradeshow from '../../Components/HomePage/WhyTradeshow'
import WhyConference from '../../Components/HomePage/WhyConference'


import './Home.css'
import '../../App.css'


class HomeTradeshow extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

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
          <div className="heading2">Remote Social Butterfly automatically organises random or coordinated chats to enable networking and knowledge transfer.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhyConference />  
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
