import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from "react-router";

import Why from './Why'
import How from './How'
import WhatDiagram from './WhatDiagram'

import './Home.css'
import '../../App.css'


class Home extends React.Component {

  render () {
    return (
      <div>        
        <div className="topSection">
          <div className="heading1"> Let's create networks</div>
          <div className="heading2">
            We believe that diverse, connected and cohesive teams and networks are the cornerstone to success and innovation. 
            Remote Social Butterfly enables the formation of such teams and networks through chance or tailored encounters across the people 
            in your company, at your conference or tradeshow.
          </div>
 
          <Button className="actionButtonAnimated" variant='contained' size="large" onClick={() => {this.props.history.push('/signup/')}}>GET STARTED</Button>  
        </div>

        <div className="infoBox infoBoxWhite"> 
          <Why />         
        </div>
        
        <div className="infoBox infoBoxwhite"> 
          <How />
        </div>

        <div className="infoBox infoBoxWhite"> 
          <WhatDiagram />          
        </div>
        
        <div className="infoBox infoBoxWhite"> 
          <div className="infoBoxContent container endCOA"> 
            <Button className="ghostButton" variant='contained' size="large" onClick={() => {this.props.history.push('/business/')}}>Remote Social Butterfly for businesses</Button>      
            <Button className="ghostButton" variant='contained' size="large" onClick={() => {this.props.history.push('/conference/')}}>Remote Social Butterfly for conferences</Button>      
            <Button className="ghostButton" variant='contained' size="large" onClick={() => {this.props.history.push('/tradeshow/')}}>Remote Social Butterfly for tradeshows</Button>      
          </div>  
        </div>
       
      </div>
    )
  }
}

export default withRouter(Home);
