import React from 'react'
import { Button} from '@material-ui/core'
import '../../Pages/Home/Home.css'


class SubscriptionConference extends React.Component {

  render () {
    return(
<div className="container planContainer">
        <div className="pricing-grid-events">
          <input type="checkbox" class="checkbox-invisible" id="basic-checkbox" name="pricing-grid"/>
          <div className="planTitle plan planInfo one">
            <label className="planHeading basic" for="basic-checkbox">Basic</label>
            <div className="planText basicInfo"> For conferences with a very diverse range of attendees so the organisation as only attribute is sufficient.</div>
          </div>
          <input type="checkbox" class="checkbox-invisible" id="premium-checkbox" name="pricing-grid"/>
          <div className="planTitle planThistle planInfo five">
            <label className="planHeading premium" for="premium-checkbox">Premium</label>
            <div className="planText premiumInfo">For conferences that want to offer more tailored matching based on attributes like common interest etc.</div>
          </div>
          <div className="planPricing plan two basicInfo">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per attendee, per chat</div>
          </div>
          <div className="planPricing planThistle six premiumInfo">
            <div className="planPrice"> XX &euro; </div>
            <div className="planPriceInfo"> Per attendee, per chat </div>
          </div>
          <div className="planCTA plan three basicInfo">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Free')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle planCTAThistle seven premiumInfo">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
          <div className="basicInfo plan planIncluded four basicInfo">
          {['Initial Consultation', 'Data Upload Assistance', 'Organisation attribute included', 'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px" className="" src="butterfly_transformation.png"  /> <div className="includedList"> {item}</div></div>})}
           </div>
          <div className="planThistle planIncluded eight premiumInfo">
          {['Initial Consultation', 'Data Upload Assistance',  'Limitless attributes', 'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px" className="" src="butterfly_transformation.png"  /> <div className="includedList"> {item}</div></div>})}
         </div>
        </div>
      </div>
    )
  }
}

export default SubscriptionConference;
