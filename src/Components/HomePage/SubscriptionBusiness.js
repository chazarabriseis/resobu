import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import '../../Pages/Home/Home.css'


class SubscriptionBusiness extends React.Component {

  render () {
    return(
      <div>
        <div className="container planContainer planInfo">
          <div className="planTitle plan">
            <div className="planHeading"> Basic</div>
            <div className="planText"> For fast growing teams where it is difficult to keep track of all the new awesome employees joining every month. Data-driven chat partner selection is not as crucial.</div>
          </div>
          <div className="planTitle planThistle">
            <div className="planHeading"> Premium</div>
            <div className="planText">For more established teams that want to break up silos and create connections throughout the company. Data-driven chat partner selection will help to connect the right people.</div>
          </div>
          <div className="planTitle plan">
            <div className="planHeading"> Business</div>
            <div className="planText">For more established company structures that want to rekindle an innovative culture and get the most out of their diverse employees. Tapping into metadata and collecting feedback to improve the chat partner selection chat by chat.</div>
          </div>
          <div className="planTitle planBorder">
            <div className="planHeading"> Enterprise</div>
            <div className="planText">For large organizations that need additional security, control, and support to handle their overwhelming data that could flow into personalising the chat partner selection.</div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planPricing plan">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually. Free for teams smaller than 40 people</div>
          </div>
          <div className="planPricing planThistle">
            <div className="planPrice"> XX &euro; </div>
            <div className="planPriceInfo"> Per user, per month billed annually </div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing plan">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually</div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing planBorder">
          </div>
        </div>
        <div className="container planContainer">
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Free')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle planCTAThistle">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Business')}>Get started</Button>  
          </div> 
          <div className="planCTA planBorder">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/contact/')}}>Get in contact</Button>  
          </div>
        </div>
        <div className="container planIncludesContainer">
          <div className="plan planIncluded">
            {['Initial Consultation'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="planThistle planIncluded">
              {['Initial Consultation', 'Data Upload Assistance',  'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="plan planIncluded">
            {['Initial Consultation', 'Data Upload Assistance', 'Connection AIssitance', 'Learning AIssitance', 'API Integration of Other Services'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div> 
          <div className="planBorder planIncluded coniner">
            {[].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SubscriptionBusiness);
