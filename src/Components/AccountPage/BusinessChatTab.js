import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core'
import TimeInput from './TimeInput'
import WeekdayInput from './WeekdayInput'
import ChatSizeInput from './ChatSizeInput'
import DurationInput from './DurationInput'
import WeekOfMonthInput from './WeekOfMonthInput'
import FrequencyInput from './FrequencyInput'

import './tabs.css'


export default class BusinessChatTab extends Component {

    render() {  
        return (
            <div className="tab">
            <div className="tabContent">

            <p><strong>Next ten chats:</strong></p>
            <div className='p container chatLine'> {this.props.onCreateNextChatsHTML()}</div>
              
              <Button variant="contained" className="actionButton" disabled={this.props.changeMeetingTime} onClick={this.props.onChangeMeeting}>Edit Chat Times</Button>   
              <Button variant="contained" className="actionButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onSaveChangeMeeting}>Save</Button>   
              <Button variant="contained" className="ghostButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onCancelChangeMeeting}>Cancel</Button>


              <div className="container">
                <div className='meetingPlanner'>
                  <div className="p">
                  <FrequencyInput
                    frequency={this.props.meetingInfo.frequency}
                    onSetFrequency={this.props.onSetMeetingInfo}
                    changeMeetingTime={this.props.changeMeetingTime}
                  />
                </div>
                  {this.props.meetingInfo.frequency === 'fortnightly' &&
                    <div className={this.props.changeMeetingTime ? '': 'inputDisabled'}>
                      <p>Every two weeks on </p>
                      <div className="p">
                        <WeekdayInput
                          weekday={this.props.meetingInfo.weekday}
                          onSetWeekday={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <div className="p">
                        <TimeInput
                          chatTime={this.props.meetingInfo.chatTime}
                          onSetTime={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <p>for</p>
                      <div className="p">
                        <DurationInput
                          chatLength={this.props.meetingInfo.chatLength}
                          onSetDuration={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                    </div> 
                  }
                  
                  {this.props.meetingInfo.frequency === 'weekly' &&
                    <div className={this.props.changeMeetingTime ? '': 'inputDisabled'}>
                      <p>Every week on </p>
                      <div className="p">
                        <WeekdayInput
                          weekday={this.props.meetingInfo.weekday}
                          onSetWeekday={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <p>at </p>
                      <div className="p">
                        <TimeInput
                          chatTime={this.props.meetingInfo.chatTime}
                          onSetTime={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <p>for</p>
                      <div className="p">
                        <DurationInput
                          chatLength={this.props.meetingInfo.chatLength}
                          onSetDuration={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                    </div> 
                  }

                  {this.props.meetingInfo.frequency === 'monthly' &&
                    <div className={this.props.changeMeetingTime ? '': 'inputDisabled'}>
                      <p>Every</p>
                      <div className="p">
                        <WeekOfMonthInput
                          weekOfMonth={this.props.meetingInfo.weekOfMonth}
                          onSetWeekOfMonth={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <div className="p">
                        <WeekdayInput
                          weekday={this.props.meetingInfo.weekday}
                          onSetWeekday={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <p>of the month at </p>
                      <div className="p">
                        <TimeInput
                          chatTime={this.props.meetingInfo.chatTime}
                          onSetTime={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                      <p>for</p>
                      <div className="p">
                        <DurationInput
                          chatLength={this.props.meetingInfo.chatLength}
                          onSetDuration={this.props.onSetMeetingInfo}
                          changeMeetingTime={this.props.changeMeetingTime}
                        />
                      </div>
                    </div> 
                  }
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

                    <TextField
                        label="Ending after"
                        type="date"
                        value={this.props.meetingInfo.endDate}
                        disabled={!this.props.changeMeetingTime}
                        onChange={this.props.onSetMeetingInfo}
                        id={'endDate'}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                  </div>
                </div>
                <div className='meetingInsight'>
                  <div className='p'>
                    You have entered <strong>{this.props.peopleList.length}</strong> people and choosen to have roughly 
                    <strong>{this.props.meetingInfo.frequency === "weekly" ? "52" : this.props.meetingInfo.frequency === "fortnightly" ? "26" : "12"} </strong>
                    meetings per year.
                  </div>
                  <div className="container">
                    <div className='p'> With: </div>
                    <ChatSizeInput
                        chatSize={this.props.meetingInfo.chatSize}
                        onSetChatSize={this.props.onSetMeetingInfo}
                        changeMeetingTime={this.props.changeMeetingTime}
                    />
                    <div className='p'>people per meeting it will take roughly</div>   
                  </div>
                  <div className="p">
                    XXX month until everyone has met.
                  </div>
                </div>
              </div>
            </div>  
          </div>
        )
    }
}

