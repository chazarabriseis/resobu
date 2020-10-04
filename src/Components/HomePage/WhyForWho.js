import React from 'react'
import { withRouter } from "react-router";
import { Button} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../Pages/Home/Home.css'

library.add(fas)


class WhyForWho extends React.Component {

  render () {
    return(
      <div>
        <div className="container planContainer">
            <div className="whoTitle plan">
                <div className="whoHeading"> Business </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Workshops / Meetings </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Conferene </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Tradeshow </div>
            </div>
        </div>

        <div className="container planContainer">
          <div className="whoIcon">
          <FontAwesomeIcon size='large' icon='building'/> 
          </div>
          <div className="whoIcon">
          <FontAwesomeIcon icon='comments'/> 
          </div>
          <div className="whoIcon">
          <FontAwesomeIcon icon='link'/> 
          </div>
          <div className="whoIcon">
          <FontAwesomeIcon icon='handshake'/> 
          </div>
        </div>

        <div className="container">
            <div className="whoText">
                <div className="planText"> 
                    Times are changing, more and more people are working from home or in different office locations. 
                    Therfore no more unplanned watercooler discussions happen which are known to lead to connections and new ideas.
                </div>
            </div>
            <div className="whoText">
                <div className="planText">
                    For established teams that want to break up silos and create connection throughout the team.
                </div>
            </div>
            <div className="whoText">
                <div className="planText">
                    The same applies to conferences and tradeshows, in the modern times. These will be carried out more often in the digital world.
                    Therfore people cannot mingle anymore in the breaks and in front of exhibition booths to exchange knowledge and build networks,
                    a major reason why people attend them.
                </div>
            </div>
            <div className="whoText">
                <div className="planText">For organizations that need additional security, control, and support to handle their overwhelming data that could flow into personalising the connections.</div>
            </div>
        </div>
    
        <div className="container planContainer">
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/business/')}}>More Info &#38; Pricing</Button>  
          </div>
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/workshop/')}}>More Info &#38;  Pricing</Button>  
          </div>
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/conference/')}}>More Info &#38;  Pricing</Button>  
          </div> 
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/tradeshow/')}}>More Info &#38;  Pricing</Button>  
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(WhyForWho);
