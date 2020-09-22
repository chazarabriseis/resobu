import React from 'react'
import { withRouter } from "react-router";
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

  handleBusiness = () => {
    this.props.history.push('/business')
    this.setState({ anchorEl: null})
  }

  handleConference = () => {
    this.props.history.push('/conference')
    this.setState({ anchorEl: null})
  }

  handleTradeshow = () => {
    this.props.history.push('/tradeshow')
    this.setState({ anchorEl: null})
  }

  closeMenu= () => {
    this.setState({ anchorEl: null})
  }


  render() {
    return (
      <div className="wrapper">
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
                  onClick={this.handleMenuClick}
                  label="menu"
                  className="headerButton"
                  aria-controls="simple-menu" 
                  aria-haspopup="true"
                >
                  <FontAwesomeIcon icon='bars'/>
                </Button> 
                <Menu
                  id="menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  anchorOrigin={{
                    vertical: 'bottom'
                  }}
                  getContentAnchorEl={null}
                  transformOrigin={{
                    vertical: 'top'
                  }}
                  elevation={0}
                  onClose={this.closeMenu}
                >
                  <MenuItem onClick={this.handleBusiness}>for Businesses</MenuItem>
                  <MenuItem onClick={this.handleConference}>for Conferences</MenuItem>
                  <MenuItem onClick={this.handleTradeshow}>for Tradeshows</MenuItem>
                </Menu>
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
