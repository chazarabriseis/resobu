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
        <div className="topSection">
          <div className="heading1"> Let's create networks</div>
          <div className="heading2">
            We believe that diverse, connected and cohesive teams and networks are the cornerstone to success and innovation. 
            Remote Social Butterfly enables the formation of such teams and networks through chance or tailored encounters across the people 
            in your company, at your workshops, your conference or tradeshow.
          </div>
 
          <Button className="actionButtonAnimated" variant='contained' size="large" onClick={() => {this.props.history.push('/signup/')}}>GET STARTED</Button>  
        </div>

        <div className="infoBox infoBoxWhite"> 
          <WhyForWho 
            onGotoSignUp = {this.gotoSignUp}
          />         
        </div>

        <div className="infoBox infoBoxWhite"> 
          <WhatDiagram />          
        </div>
        
        <div className="infoBox infoBoxwhite"> 
          <How />
        </div>
       
      </div>
    )
  }
}

export default withRouter(Home);
