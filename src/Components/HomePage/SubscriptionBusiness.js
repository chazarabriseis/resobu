import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import '../../Pages/Home/Home.css'


class SubscriptionBusiness extends React.Component {

  render () {
    return(
      <div className="container planContainer">
        <div className="pricing-grid">
          <input type="checkbox" class="checkbox-invisible" id="basic-checkbox" name="pricing-grid"/>
          <div className="planTitle plan planInfo one">
            <label className="planHeading basic" for="basic-checkbox">Basic</label>
            <div className="planText basicInfo"> For fast growing teams or large organisations where it is difficult to integrate new employees in the entire orginzation.</div>
          </div>
          <input type="checkbox" class="checkbox-invisible" id="premium-checkbox" name="pricing-grid"/>
          <div className="planTitle planThistle planInfo five">
            <label className="planHeading premium" for="premium-checkbox">Premium</label>
            <div className="planText premiumInfo">For organisations that want to break up silos and create connections throughout the organisation.</div>
          </div>
          <input type="checkbox" class="checkbox-invisible" id="business-checkbox" name="pricing-grid"/>
          <div className="planTitle plan planInfo nine">
            <label className="planHeading business" for="business-checkbox">Business</label>
            <div className="planText businessInfo">For organisations with very established structures that want to rekindle an innovative culture and get the most out of their diverse employees. Tapping into metadata and collecting feedback to improve chat partner selection chat by chat.</div>
          </div>
          <input type="checkbox" class="checkbox-invisible" id="enterprise-checkbox" name="pricing-grid"/>
          <div className="planTitle planBorder planInfo thirteen">
            <label className="planHeading enterprise" for="enterprise-checkbox">Enterprise</label>
            <div className="planText enterpriseInfo">For large organisations that need additional control and support to handle their overwhelming data that could flow into personalising the chat partner selection.</div>
          </div>
          <div className="planPricing plan two basicInfo">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually. Free for teams smaller than 40 people</div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing planThistle six premiumInfo">
            <div className="planPrice"> XX &euro; </div>
            <div className="planPriceInfo"> Per user, per month billed annually </div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing plan ten businessInfo">
            <div className="planPrice"> XX &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually</div>
            <div className="planPriceInfoExtra"> XX &euro; billed monthly </div>
          </div>
          <div className="planPricing planBorder fourteen enterpriseInfo">
          </div>
          <div className="planCTA plan three basicInfo">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Free')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle planCTAThistle seven premiumInfo">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
          <div className="planCTA plan eleven businessInfo">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Business')}>Get started</Button>  
          </div> 
          <div className="planCTA planBorder fivteen enterpriseInfo">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/contact/')}}>Get in contact</Button>  
          </div>
          <div className="basicInfo plan planIncluded four basicInfo">
            {['Initial Consultation', 'Team and project attributes included', 'Connection AIssistance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px" className="subscriptionIcon" src="butterfly_transformation.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="planThistle planIncluded eight premiumInfo">
              {['Initial Consultation', 'Data Upload Assistance', 'Limitless attributes', 'Connection AIssistance'].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px" className="subscriptionIcon" src="butterfly_transformation.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
          <div className="plan planIncluded twelve businessInfo">
            {['Initial Consultation', 'Data Upload Assistance', 'Limitless attributes', 'Connection AIssistance', 'Learning AIssistance', 'API Integration of Other Services'].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px"className="subscriptionIcon" src="butterfly_transformation.png" /> <div className="includedList"> {item}</div></div>})}
          </div> 
          <div className="planBorder planIncluded sixteen enterpriseInfo">
            {[].map((item, index) => { return <div className="container"><img alt="appIcon" width="30px" height="27px" className="subscriptionIcon" src="butterfly_transformation.png" /> <div className="includedList"> {item}</div></div>})}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SubscriptionBusiness);
