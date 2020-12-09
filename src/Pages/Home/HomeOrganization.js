import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import SubscriptionBusiness from '../../Components/HomePage/SubscriptionBusiness'
import UseCasesOrganizations from '../../Components/HomePage/UseCasesOrganizations'

import './Home.css'
import '../../App.css'

library.add(fas)



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
          <div className="heading1"> <FontAwesomeIcon icon='building'/> </div>
          <div className="heading2">ReSoBu organizes tailored chats to your needs to enable networking, knowledge transfer and an innovative culture.</div>
          <Button value= '-' className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>

        <div className="infoBox infoBoxWhite"> 
          <UseCasesOrganizations />
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
