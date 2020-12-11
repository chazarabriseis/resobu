import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";

import WhyForWho from '../../Components/HomePage/WhyForWho'
import How from '../../Components/HomePage/How'
import WhatDiagram from '../../Components/HomePage/WhatDiagram'

import './Home.css'
import '../../App.css'


class Home extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div>        
        <div className="topSection contentContainer">
          <div className="heading1"> Tailoring communication to your needs </div>
          <div className="heading2">
            Let us take care of fostering communication accross your organization or at your event. Enabling a healthy culture and thriving networks which are crucial to innovation and success. 
          </div>
 
          <Button className="actionButtonAnimated" variant='contained' size="large" onClick={() => {this.props.history.push('/signup/')}}>GET STARTED</Button>  
        </div>


        <div className="infoBox infoBoxWhite contentContainer"> 
          <WhyForWho 
            onGotoSignUp = {this.gotoSignUp}
          />         
        </div>

        <div className="infoBox infoBoxGray contentContainer"> 
          <How />
        </div>

        
        <div className="infoBox infoBoxwhite contentContainer"> 
          <WhatDiagram />
        </div>
       
      </div>
    )
  }
}

export default withRouter(Home);
