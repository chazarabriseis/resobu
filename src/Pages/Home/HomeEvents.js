import React from 'react'
import { Button} from '@material-ui/core'
import { withRouter } from "react-router";

import SubscriptionConference from '../../Components/HomePage/SubscriptionConference'
import WhatDiagramConference from '../../Components/HomePage/WhatDiagramConference'
import WhyConference from '../../Components/HomePage/WhyConference'

import './Home.css'
import '../../App.css'


class HomeConference extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  gotoSignUp = (value) => {
    this.props.onsetGroupType('Conference')
    this.props.onSetSubscription(value)
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's enable networking at your conference</div>
          <div className="heading2">Remote Social Butterfly automatically organises random or tailored chats to enable networking and knowledge transfer.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>
        <div style={{fontWeight: '500' , display: 'inline'}}>For Workshops, Conferences and Tradeshows: When additional data exists the 
            connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can work to develop encounters between attendees at conferences or 
            tradeshows based on areas of expertise, locations, business areas and other relevant data to make sure the meetings organised are as meaningful and as beneficial as possible. 
            It will avoid organising meetings that do not make sense, such as meetings between people who work at the same company or for competitors.
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhyConference />  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <WhatDiagramConference />  
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
