import React from 'react'
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import '../../Pages/Home/Home.css'
import '../../App.css'

library.add(fas)



class HomeBusiness extends React.Component {

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
                <label className="whoHeading uc1H" for="uc1-checkbox">Global Pandemic</label>
            </div>
            <input type="checkbox" class="checkbox-invisible" id="uc2-checkbox"/>
            <div className="usecaseTitle plan five">
                <label className="whoHeading uc2H" for="uc2-checkbox">Different office locations</label>
            </div>

            <div className="usecaseText plan two uc1">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3" style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    Many employees work from home and thus informal and spontaneous chats with people outside the team or project are not happening.
                    Missing watercooler-like interactions are weakening the team.
                </div>
            </div>
            <div className="usecaseText plan six uc2">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3" style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    Employees work across different locations.
                    People working on similar problems might not know of each other and hence no knowledge transfer is happening which would make the progress more efficient.

                </div>
            </div>

            <div className="usecaseText plan three uc1">
                <div>
                    <FontAwesomeIcon icon='keyboard'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Input</div>
                </div>
                <div className="inputText">
                    <ol>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Team, Projects</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Everyone except from the same project and team</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div>  Every week until the pandemic is over</li>
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
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Location, Skillset</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Everyone except same location but with similar skills</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div> Every second week of the month</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Chat Size:</div>  3</li>
                    </ol>
                </div>
            </div>
            
            <div className="usecaseBottom plan four uc1">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organise chats according to the input
                </div>
            </div>
            <div className="usecaseBottom plan eight uc2">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organise chats according to the input
                </div>
            </div>
            
            <input type="checkbox" class="checkbox-invisible" id="uc3-checkbox"/>
            <div className="usecaseTitle plan nine">
                <label className="whoHeading uc3H" for="uc3-checkbox">Knowledge Transfer</label>
            </div>
            <input type="checkbox" class="checkbox-invisible" id="uc4-checkbox"/>
            <div className="usecaseTitle plan thirteen">
                <label className="whoHeading uc4H" for="uc4-checkbox">Onboarding Buddy</label>
            </div>

            <div className="usecaseText plan ten">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    Problem3 A project manager is facing a roadblock or problem.
                    Most likely someone in the organization was facing a similar problem but the project manager doesn’t know about  that person. 
                    Lack of knowledge exchange makes the organization less efficient.
                </div>
            </div>
            <div className="usecaseText plan fourteen">
                <div>
                    <FontAwesomeIcon icon='exclamation'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Problem</div>
                </div>
                <div className="problemText"> 
                    Problem4 Fast growing organizations struggle to include new hires and make sure they get to see the entire organizations.
                    Social events are not happening monthly to take care of this plus normally people who already know each other stick together and don’t mingle.
                </div>
            </div>

            <div className="usecaseText plan eleven">
                <div>
                    <FontAwesomeIcon icon='keyboard'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Input</div>
                </div>
                <div className="inputText">
                <ol>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Job Title, Skillset</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Everyone with same job title and at least one similar skill</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div> Next Wednesday at 4pm</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Chat Size:</div>  4</li>
                    </ol>
     
                </div>
            </div>
            <div className="usecaseText plan fifteen">
                <div>
                    <FontAwesomeIcon icon='keyboard'/> 
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>Input</div>
                </div>
                <div className="inputText">
                <ol>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>People Attributes:</div> Departement</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Constraints: </div> Different departement</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Meeting time:</div>  weekly for the first month</li>
                        <li><div style={{display: 'inline', fontWeight: 'bold'}}>Chat Size:</div>  2</li>
                    </ol>
                </div>
            </div>

            <div className="usecaseBottom plan twelve">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organise chats according to the input
                </div>
            </div>
            <div className="usecaseBottom plan sixteen-2">
                <div>
                    <img alt="appIcon" width="28" src="butterfly.png" />
                    <div className="heading3"  style={{display: 'inline', marginLeft: '10px'}}>ReSoBu</div>
                </div>
                <div className="planText">
                Connection AIssitance will tailor groups and organise chats according to the input
                </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HomeBusiness);
