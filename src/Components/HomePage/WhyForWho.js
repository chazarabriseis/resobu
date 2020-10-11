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
                <div className="whoHeading"> Workshops </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Conference </div>
            </div>
            <div className="whoTitle plan">
                <div className="whoHeading"> Tradeshow </div>
            </div>
        </div>

        <div className="container planContainer">
          <div className="whoIcon">
          <FontAwesomeIcon icon='building'/> 
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
                    Are you missing that employees mingle at random watercooler like conversations in your company?
                </div>
            </div>
            <div className="whoText">
                <div className="planText">
                    Are you missing that people with the same interest start chating during the coffee break at your workshop?
                </div>
            </div>
            <div className="whoText">
                <div className="planText">
                    Are you missing that attendees of your conference can keep on discussing the presentation they just went to?
               </div>
            </div>
            <div className="whoText">
                <div className="planText">
                    Are you missing that exhibitors at your tradeshow are meeting new potential clients?   
                </div>
            </div>
        </div>
    
        <div className="container planContainer">
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/business/')}}>More Info </Button>  
          </div>
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/workshop/')}}>More Info </Button>  
          </div>
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/conference/')}}>More Info</Button>  
          </div> 
          <div className="planCTA plan whoButton">
            <Button className="ghostButton" variant="contained" size="large" onClick={() => {this.props.history.push('/tradeshow/')}}>More Info </Button>  
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(WhyForWho);
