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
        <div style={{fontWeight: '500', display: 'inline'}}>For Businesses: Feeding the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance with data, chats can be organised more purposefully.
                  For example, we can make sure that team and project colleagues don't meet since they are already in contact. 
                  Or if exiting communication problems between departements are known, the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can target specific encounters.
                  You can also just plug in your Teams, Trello etc and the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance will learn from the metadata which connections already exists or where they are lacking.
                  Possibilities are endless, the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can be tailored exactly to your needs.
                </div>
        <div className="infoBox infoBoxWhite"> 
         
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 

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
