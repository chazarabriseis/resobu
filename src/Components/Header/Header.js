import React from 'react'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Header.css'
import '../../App.css'

library.add(fas)


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  signOut = () => {
    this.props.history.push('/')
    this.props.onSignOut()
  }

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  closeMenu= () => {
    this.setState({ anchorEl: null})
  }


  render() {
    return (
      <div className="wrapper headerContainer">
        <AppBar position="fixed" className='header'>
          <Toolbar className="header">
              <div className="leftSide">
                <Button 
                  className="headerButton"
                  onClick={() => {this.props.history.push('/')}}
                > 
                  <img alt="appIcon" width="28" src="butterfly.png" />
                  <div style={{display: 'inline', marginLeft: '10px'}}>Remote Social Butterfly</div>
                </Button>
                <Button 
                  onClick={() => {this.props.history.push('/organizations')}}
                  className="headerButton"
                > 
                  <div style={{display: 'inline', marginLeft: '10px', color: 'gray'}}>For Organizations</div>
                </Button>
                <Button 
                  onClick={() => {this.props.history.push('/events')}}
                  className="headerButton"
                > 
                  <div style={{display: 'inline', marginLeft: '10px', color: 'gray'}}>For Events</div>
                </Button>
        
              </div>
              <Button 
                onClick={() => {this.props.history.push('/contact')}}
                label="contact"
                className="headerButton"
              >
                <FontAwesomeIcon icon='envelope'/>
              </Button>  
              { this.props.isAuthenticated ? (             
                  <Button
                    onClick={() => {this.props.history.push('/account')}}
                    label='account'
                    className="headerButton"
                  >
                    {this.props.userInfo.email}
                  </Button>
                  
              ) : (
                <div>
                  <Button 
                    onClick={() => {this.props.history.push('/signin')}}
                    label="Log In"
                    className="ghostButton"
                  >
                    Sign In
                  </Button>  
                  <Button 
                    onClick={() => {this.props.history.push('/signup')}}
                    label="Sign Up"
                    className="actionButton"
                  >
                    GET STARTED
                  </Button>  
                </div>
              )}
              { this.props.isAuthenticated && (             
                  <Button
                    className='ghostButton'
                    onClick={this.signOut}
                  >
                    Sign Out
                  </Button>  
                )
              }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(Header);
