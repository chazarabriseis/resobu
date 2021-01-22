import React from 'react'
import { Button} from '@material-ui/core'
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import SubscriptionConference from '../../Components/HomePage/SubscriptionConference'
import UseCasesEvents from '../../Components/HomePage/UseCasesEvents'

import './Home.css'
import '../../App.css'

library.add(fas)

class HomeConference extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  gotoSignUp = (value) => {
    this.props.onsetGroupType('Event')
    this.props.onSetSubscription(value)
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> Let's enable networking at your event</div>
          <div className="heading1"> <FontAwesomeIcon icon='link'/>  </div>
          <div className="heading2">Remote Social Butterfly automatically organises tailored chats to enable networking and knowledge transfer at for example conferences, workshops or tradeshows.</div>
          <Button className="actionButtonAnimated" size="large" onClick={this.gotoSignUp.bind(this, '-')}>GET STARTED</Button>  
        </div>
        <div className="infoBox infoBoxWhiteWorkflow"> 
          <UseCasesEvents />  
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
