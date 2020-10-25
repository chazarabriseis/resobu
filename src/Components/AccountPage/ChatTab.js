import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'

import TimeInput from './TimeInput'
import DurationInput from './DurationInput'

import './tabs.css'


export default class BusinessChatTab extends Component {

    render() {  
        return (
            <div className="tab">
                <div className="tabContent">
                    <Button variant="contained" className="actionButton" onClick={this.props.onOpenAddChatDialog}> Add Chat </Button>
                    <Button variant="contained" className="actionButton" disabled={this.props.disableChatButtons} onClick={this.props.onOpenEditChatDialog}> Edit Chat </Button>   
                    <Button variant="contained" className="actionButton" disabled={this.props.disableChatButtons} onClick={this.props.onOpenDeleteChatDialog}> Delete Chat </Button>   
                    <div className='meetingPlanner'>
                        <div className= "container chatContainer">
                            {this.props.onCreateChatHTML()}
                        </div>
                    </div>
                    <Dialog open={this.props.showChatDialog} >
                        <DialogTitle>{this.props.showEditChatDialog ? 'Edit Chat' : 'Add Chat'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.props.showEditChatDialog ? 
                                    'Change meeting ' + this.props.meetingInfo.chats[this.props.selectedChatTableId].id : 
                                    'Choose a date, time and duration for the chat'
                                }
                            </DialogContentText>
                            <p>On</p>                 
                            <div className="p">
                                <TextField
                                    type="date"
                                    value={this.props.chatInfo.chatDate}
                                    onChange={this.props.onSetChatInfo}
                                    id={'date'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <p>at </p>
                            <div className="p">
                                <TimeInput
                                    chatTime={this.props.chatInfo.chatTime}
                                    onSetTime={this.props.onSetChatInfo}
                                    changeMeetingTime={true}
                                />
                            </div>
                            <p>for</p>
                            <div className="p">
                                <DurationInput
                                    chatLength={this.props.chatInfo.chatLength}
                                    onSetDuration={this.props.onSetChatInfo}
                                    changeMeetingTime={true}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" className="actionButton" onClick={this.props.onSaveChat}>
                                Save
                            </Button> 
                            <Button variant="contained" className="ghostButton" onClick={this.props.onCancelChangeChat}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>  
        )
    }
}

