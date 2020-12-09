import React from 'react'
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import '../../Pages/Home/Home.css'
import '../../App.css'

library.add(fas)



class UseCasesEvents extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  gotoSignUp = (value) => {
    this.props.onsetGroupType('Business')
    this.props.onSetSubscription(value)
    this.props.history.push('/signup/')
  }

  render () {
    return (
      <div>
        <div className='heading3'>Use Cases: </div>
        <div className="container planContainer">
          <div className="usecase-orga-grid">
            <input type="checkbox" class="checkbox-invisible" id="uc1-checkbox"/>
            <div className="usecaseTitle plan one">   
                <label className="whoHeading uc1H" for="uc1-checkbox">Remote Conference</label>
            </div>
            <input type="checkbox" class="checkbox-invisible" id="uc2-checkbox"/>
            <div className="usecaseTitle plan five">
                <label className="whoHeading uc2H" for="uc2-checkbox">Large Conference</label>
            </div>

            <div className="usecaseText plan two uc1">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3" style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    One major reason why people join conferences is to meet people who work in a similar sector and to exchange knowledge and to discuss.
                    At remote conferences this is very difficult to offer, how do you make sure people get to talk 1:1 with a meaningful chat partner? 
                </div>
            </div>
            <div className="usecaseText plan six uc2">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3" style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    One major reason why people join conferences is to meet new people who work in a similar sector and to exchange knowledge and to discuss.
                    Large conferences can be overwhelming and nearly impossible to coincidencly start talking to the right people.
                </div>
            </div>

            <div className="usecaseText plan three uc1">
                <div>
                    <FontAwesomeIcon icon='keyboard'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Input</div>
                </div>
                <div className="inputText">
                    <ol>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Organization, Interest</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Everyone except from the same organization but with the same interest</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div>  Networking session</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Chat Size:</div>  3</li>
                    </ol>
                </div>
            </div>
            <div className="usecaseText plan seven uc2">
                <div>
                    <FontAwesomeIcon icon='keyboard'/> 
                    <div className="heading3" style={{display: 'inline', marginLeft: '10px'}}>Input</div>
                </div>
                <div className="inputText">
                    <ol>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Organization, Position, Field</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Everyone except same organization but with similar position and work in same field</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div> Networking session</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Chat Size:</div> 2</li>
                    </ol>
                </div>
            </div>
            
            <div className="usecaseBottom plan four uc1">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organize chats according to the input
                </div>
            </div>
            <div className="usecaseBottom plan eight uc2">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organize chats according to the input
                </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UseCasesEvents);
