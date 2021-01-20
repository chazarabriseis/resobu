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

  closeMenu= (e) => {
    this.setState({ anchorEl: null})
    if (e.target.id === "signout") {
      this.signOut()
    }
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
                  <img alt="appIcon" width="28" src="logo_resobu_no_text.png" />
                  <div style={{display: 'inline', marginLeft: '10px'}}>Remote Social Butterfly</div>
                </Button>

                <Button 
                  onClick={this.handleMenuClick}
                  label="menu"
                  className="headerButton mobile-view"
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
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  getContentAnchorEl={null}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  elevation={0}
                  onClose={this.closeMenu}
                >
                  <MenuItem component={Link} to="/organizations" onClick={this.closeMenu}  className="headerButton"> 
                    For Organizations
                  </MenuItem>
                  <MenuItem component={Link} to="/events" onClick={this.closeMenu}  className="headerButton">
                    For Events
                  </MenuItem>
                  <MenuItem component={Link} to="/contact" onClick={this.closeMenu}> 
                    <FontAwesomeIcon icon='envelope'/>
                  </MenuItem>  
                  { this.props.isAuthenticated ? (             
                  <MenuItem component={Link} to="/account" onClick={this.closeMenu}>
                    {this.props.userInfo.email}
                  </MenuItem>
                  ) : (
                    <div>
                      <MenuItem component={Link} to="/signin" onClick={this.closeMenu} className="ghostButton">
                        Sign In
                      </MenuItem>  
                      <MenuItem component={Link} to="/signup" onClick={this.closeMenu} className="actionButton">
                        GET STARTED
                      </MenuItem>  
                    </div>
                  )}
                  { this.props.isAuthenticated && (             
                      <MenuItem component={Link} to="/" id="signout" onClick={this.closeMenu} className="ghostButton">
                        Sign Out
                      </MenuItem>  
                    )
                  }
                </Menu>
                
                <Button 
                  className="headerButton pc-view"
                  onClick={() => {this.props.history.push('/organizations')}}
                > 
                  <div style={{display: 'inline', marginLeft: '10px'}}>For Organizations</div>
                </Button>
                <Button 
                  className="headerButton pc-view"
                  onClick={() => {this.props.history.push('/events')}}
                > 
                  <div style={{display: 'inline', marginLeft: '10px'}}>For Events</div>
                </Button>
        
              </div>
              <Button 
                onClick={() => {this.props.history.push('/contact')}}
                label="contact"
                className="headerButton pc-view"
              >
                <FontAwesomeIcon icon='envelope'/>
              </Button>  
              { this.props.isAuthenticated ? (             
                  <Button
                    onClick={() => {this.props.history.push('/account')}}
                    label='account'
                    className="headerButton pc-view"
                  >
                    {this.props.userInfo.email}
                  </Button>
                  
              ) : (
                <div>
                  <Button 
                    onClick={() => {this.props.history.push('/signin')}}
                    label="Log In"
                    className="ghostButton pc-view"
                  >
                    Sign In
                  </Button>  
                  <Button 
                    onClick={() => {this.props.history.push('/signup')}}
                    label="Sign Up"
                    className="actionButton pc-view"
                  >
                    GET STARTED
                  </Button>  
                </div>
              )}
              { this.props.isAuthenticated && (             
                  <Button
                    className='ghostButton pc-view'
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
