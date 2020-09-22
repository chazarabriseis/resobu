import React from 'react'
import { withRouter } from "react-router";
import { Toolbar, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Footer.css'

library.add(fas)


class Footer extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Toolbar className="footer">
          <Button 
            onClick={() => {this.props.history.push('/aboutus')}}
            label="info"
            className= "footerContent"
          >
            About us 
          </Button>  
          <Button 
            onClick={() => {this.props.history.push('/contact')}}
            label="contact"
            className= "footerContent"
          >
            <FontAwesomeIcon icon='envelope'/>
          </Button>  
        </Toolbar>
      </div>
    )
  }
}

export default withRouter(Footer);
