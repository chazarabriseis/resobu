import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';

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
                    <Button variant="contained" className="actionButton" disabled={this.props.disableChatButtons} onClick={this.props.onDeleteChat}> Delete Chat </Button>   
                    <div className='meetingPlanner'>
                        <div className= "container">
                            {this.props.onCreateChatHTML()}
                        </div>
                    </div>
                    <Dialog open={this.props.showAddChatDialog} >
                        <DialogTitle>{this.props.showEditChatDialog ? 'Edit Chat' : 'Add Chat'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Choose a date, time and duration for the chat
                            </DialogContentText>
                            <p>On</p>                 
                            <div className="p">
                                <TextField
                                    type="date"
                                    value={this.props.chatInfo.date}
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
                                    time={this.props.chatInfo.time}
                                    onSetTime={this.props.onSetChatInfo}
                                    changeMeetingTime={true}
                                />
                            </div>
                            <p>for</p>
                            <div className="p">
                                <DurationInput
                                    duration={this.props.chatInfo.duration}
                                    onSetDuration={this.props.onSetChatInfo}
                                    changeMeetingTime={true}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" className="actionButton" onClick={this.props.onSaveAddChat}>
                                Save
                            </Button> 
                            <Button variant="contained" className="ghostButton" onClick={this.props.onCancelChangeMeeting}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <ToastContainer />
            </div>  
        )
    }
}

