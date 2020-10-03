import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core'
import TimeInput from './TimeInput'
import WeekdayInput from './WeekdayInput'
import DurationInput from './DurationInput'
import WeekOfMonthInput from './WeekOfMonthInput'
import FrequencyInput from './FrequencyInput'

import './tabs.css'


export default class BusinessChatTab extends Component {

    render() {  
        return (
            <div className="tab">
                <Button variant="contained" size="large" className="ghostButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onAddAnotherMeeting}>+</Button>
                <div className="tabContent">
                
                    <Button variant="contained" size="large" className="actionButton" disabled={this.props.changeMeetingTime} onClick={this.props.onChangeMeeting}>Change Meeting Time</Button>   
                    <Button variant="contained" size="large" className="actionButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onSaveChangeMeeting}>Save</Button>   
                    <Button variant="contained" size="large" className="ghostButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onCancelChangeMeeting}>Cancel</Button>
                    
                    <div className='meetingPlanner'>
                        <p>
                            Choose the meeting time here so we can schedule meetings. 
                            You should also let people know that these are times when remote social butterfly chats will take place.
                        </p>
                        <p>On</p>                 
                        <div className="p">
                            <TextField
                            label="Starting on"
                            type="date"
                            value={this.props.meetingInfo.startDate}
                            disabled={!this.props.changeMeetingTime}
                            onChange={this.props.onSetMeetingInfo}
                            id={'startDate'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </div>
                        <p>at </p>
                        <div className="p">
                            <TimeInput
                            time={this.props.meetingInfo.time}
                            onSetTime={this.props.onSetMeetingInfo}
                            changeMeetingTime={this.props.changeMeetingTime}
                            />
                        </div>
                        <p>for</p>
                        <div className="p">
                            <DurationInput
                            duration={this.props.meetingInfo.duration}
                            onSetDuration={this.props.onSetMeetingInfo}
                            changeMeetingTime={this.props.changeMeetingTime}
                            />
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

