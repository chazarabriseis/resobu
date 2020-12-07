import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import '../../Pages/Home/Home.css'


class SubscriptionBusiness extends React.Component {

  render () {
    return(
      <div className="container planContainer">
        <div className="pricing-grid">
          <div className="planTitle plan planInfo one">
            <input type="checkbox" class="checkbox-invisible" id="basic-checkbox" name="pricing-grid"/>
            <label className="planHeading basic" for="basic-checkbox">Basic</label>
            <div className="planText"> For fast growing teams where it is difficult to keep track of all the new awesome employees joining every month..</div>
          </div>
          <div className="planTitle planThistle planInfo five">
          <input type="checkbox" class="checkbox-invisible" id="premium-checkbox" name="pricing-grid"/>
            <label className="planHeading premium" for="premium-checkbox">Premium</label>
            <div className="planText">For more established teams that want to break up silos and create connections throughout the company.</div>
          </div>
          <div className="planTitle plan planInfo nine">
          <input type="checkbox" class="checkbox-invisible" id="business-checkbox" name="pricing-grid"/>
            <label className="planHeading business" for="business-checkbox">Business</label>
            <div className="planText">For more established company structures that want to rekindle an innovative culture and get the most out of their diverse employees. Tapping into metadata and collecting feedback to improve the chat partner selection chat by chat.</div>
          </div>
          <div className="planTitle planBorder planInfo thirteen">
          <input type="checkbox" class="checkbox-invisible" id="enterprise-checkbox" name="pricing-grid"/>
            <label className="planHeading enterprise" for="enterprise-checkbox">Enterprise</label>
            <div className="planText">For large organizations that need additional security, control, and support to handle their overwhelming data that could flow into personalising the chat partner selection.</div>
          </div>
          <div className="planPricing plan two">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually. Free for teams smaller than 40 people</div>
          </div>
          <div className="planPricing planThistle six">
            <div className="planPrice"> XX &euro; </div>
            <div className="planPriceInfo"> Per user, per month billed annually </div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing plan ten">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually</div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing planBorder fourteen">
          </div>
          <div className="planCTA plan three">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Free')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle planCTAThistle seven">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
          <div className="planCTA plan eleven">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Business')}>Get started</Button>  
          </div> 
          <div className="planCTA planBorder fivteen">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/contact/')}}>Get in contact</Button>  
          </div>
          <div className="plan planIncluded four">
            {['Initial Consultation', 'Team and project attributes included', 'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="planThistle planIncluded eight">
              {['Initial Consultation', 'Data Upload Assistance', 'Limitless attributes', 'Connection AIssitance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="plan planIncluded twelve">
            {['Initial Consultation', 'Data Upload Assistance', 'Limitless attributes', 'Connection AIssitance', 'Learning AIssitance', 'API Integration of Other Services'].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div> 
          <div className="planBorder planIncluded sixteen">
            {[].map((item, index) => { return <div className="container"><img alt="appIcon" width="12" className="subscriptionIcon" src="butterfly.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SubscriptionBusiness);
