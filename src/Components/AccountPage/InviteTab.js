import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core'
import './tabs.css'


export default class InviteTab extends Component {

  render() {  
      return (
            <div className="tab">
              <div className="tabContent">
                
                <Button variant="contained" className="actionButton" disabled={this.props.changeInvite} onClick={this.props.onChangeInviteText}>Change Invite Text</Button>   
                <Button variant="contained" className="actionButton"  disabled={!this.props.changeInvite} onClick={this.props.onSaveChangeInviteText}>Save</Button>   
                <Button variant="contained" className="ghostButton"  disabled={!this.props.changeInvite} onClick={this.props.onCancelChangeInviteText}>Cancel</Button>
                <div className='heading4'>
                  Here you can set the tone of the Remote Social Butterfly chats, should it be purly random what people talk about or do you want to guide the chat with a few questions they should discuss, 
                  e.g. What are you struggeling with at the moment? What is the tool that makes your work more efficient? How do you think we can help our clients the most?
                </div>
                <div className="p">
                  <TextField 
                      id="inviteText" 
                      disabled={!this.props.changeInvite}
                      multiline 
                      fullWidth 
                      required
                      rows={10} 
                      label="Invite text" 
                      variant="outlined"
                      value={this.props.inviteText}
                      onChange={this.props.onSetInviteText}
                      error={this.props.inviteText.length > 1000 || this.props.inviteText.length < 1}
                      helperText={this.props.inviteText.length > 1000 ? 'Invite text cannot be longer than 1000 characters' : this.props.inviteText.length < 1 ? 'Invite text is required' : ''} 
                    />
                    </div>
              </div>  
            </div>
        )
  }
}

