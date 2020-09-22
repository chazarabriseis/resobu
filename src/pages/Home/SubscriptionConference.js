import React from 'react'
import { Button} from '@material-ui/core'
import './Home.css'


class SubscriptionConference extends React.Component {

  render () {
    return(
      <div>
        <div className="container planContainer planInfo">
          <div className="planTitle plan">
            <div className="planHeading"> Standard</div>
            <div className="planText"> For conferences with a very diverse range of attendees so random matching of chat partners is sufficient.</div>
          </div>
          <div className="planTitle planThistle">
            <div className="planHeading"> Premium</div>
            <div className="planText">For conferences with existing networks so tailored matching ensures that people meet strangers.</div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planPricing plan">
            <div className="planPrice"> 0.50 &euro;</div>
            <div className="planPriceInfo"> Per attendee, per chat</div>
          </div>
          <div className="planPricing planThistle">
            <div className="planPrice"> 1 &euro; </div>
            <div className="planPriceInfo"> Per attendee, per chat </div>
            <div className="planPriceInfoExtra"> 2chats already included </div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Standard')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
        </div>
      </div>
    )
  }
}

export default SubscriptionConference;
