import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import './Home.css'


class SubscriptionBusiness extends React.Component {

  render () {
    return(
      <div>
        <div className="container planContainer planInfo">
          <div className="planTitle plan">
            <div className="planHeading"> Free</div>
            <div className="planText"> For fast growing teams where it is difficul to keep track of all the new awesome employees.</div>
          </div>
          <div className="planTitle planThistle">
            <div className="planHeading"> Premium</div>
            <div className="planText">For established teams that want to break up silos and create connection throughout the team.</div>
          </div>
          <div className="planTitle plan">
            <div className="planHeading"> Business</div>
            <div className="planText">For established company structures that want to get the most out of their diverse employees and drive innovation.</div>
          </div>
          <div className="planTitle planBorder">
            <div className="planHeading"> Enterprise</div>
            <div className="planText">For organizations that need additional security, control, and support to handle their overwhelming data that could flow into personalising the connections.</div>
          </div>
        </div>
        <div className="container planContainer">
          <div className="planPricing plan">
            <div className="planPrice"> 0 &euro;</div>
            <div className="planPriceInfo"> Free for teams smaller than 40 people</div>
          </div>
          <div className="planPricing planThistle">
            <div className="planPrice"> 2 &euro; </div>
            <div className="planPriceInfo"> Per user, per month billed annually </div>
            <div className="planPriceInfoExtra"> 2.20 &euro; billed monthly </div>
          </div>
          <div className="planPricing plan">
            <div className="planPrice"> 3 &euro;</div>
            <div className="planPriceInfo"> Per user, per month billed annually</div>
            <div className="planPriceInfoExtra"> 3.30 &euro; billed monthly </div>
          </div>
          <div className="planPricing planBorder">
          </div>
        </div>
        <div className="container planContainer">
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Free')}>Get started</Button>  
          </div>
          <div className="planCTA planThistle">
            <Button className="actionButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Premium')}>Get started</Button>  
          </div>
          <div className="planCTA plan">
            <Button className="ghostButton" variant="contained" size="large" onClick={this.props.onGotoSignUp.bind(this, 'Business')}>Get started</Button>  
          </div> 
          <div className="planCTA planBorder">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/contact/')}}>Get in contact</Button>  
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SubscriptionBusiness);
