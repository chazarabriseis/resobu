import React from 'react'
import { Button} from '@material-ui/core'
import '../../Pages/Home/Home.css'


class SubscriptionTradeshow extends React.Component {

  render () {
    return(
      <div>
        <div className="container planContainer planInfo">
          <div className="planTitle plan">
            <div className="planHeading"> Basic</div>
            <div className="planText"> For tradeshows with a very diverse range of attendees so random matching of chat partners is sufficient.</div>
          </div>
          <div className="planTitle planThistle">
            <div className="planHeading"> Premium</div>
            <div className="planText">For tradeshos with many participants so tailored matching ensures that people meet relevant chat partners.</div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planPricing plan">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per attendee, per chat</div>
          </div>
          <div className="planPricing planThistle">
            <div className="planPrice"> XX &euro; </div>
            <div className="planPriceInfo"> Per attendee, per chat </div>
            <div className="planPriceInfoExtra"> 2chats already included </div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Standard')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle planCTAThistle">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
        </div>
        <div className="container planIncludesContainer">
          <div className="plan planIncluded">
            {['Initial Consultation', 'Data Upload Assistance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="planThistle planIncluded">
              {['Initial Consultation', 'Data Upload Assistance',  'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
        </div>
      </div>
    )
  }
}

export default SubscriptionTradeshow;
