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
                <div className="whoHeading"> Organizations </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Events </div>
            </div>
        </div>

        <div className="container planContainer">
          <div className="whoIcon plan">
            <FontAwesomeIcon icon='building'/> 
          </div>
          <div className="whoIcon plan">
            <FontAwesomeIcon icon='link'/> 
          </div>
        </div>
        <div className="container planContainer">
            <div className="whoText plan">
                <div className="planText"> 
                    Do you feel your organization is missing communication across departements and locations?
                </div>
            </div>
            <div className="whoText plan">
                <div className="planText">
                    Would you like that attendees of your remote events have the chance to find new connections?
               </div>
            </div>
        </div>
    
        <div className="container planContainer">
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/business/')}}>More Info </Button>  
          </div>
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/conference/')}}>More Info</Button>  
          </div> 
        </div>
      </div>
    )
  }
}

export default withRouter(WhyForWho);
