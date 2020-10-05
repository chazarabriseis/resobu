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
              <div className="tabContent">
                
                <Button variant="contained" className="actionButton" disabled={this.props.changeMeetingTime} onClick={this.props.onChangeMeeting}>Edit Chat Time</Button>   
                <Button variant="contained" className="actionButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onSaveChangeMeeting}>Save</Button>   
                <Button variant="contained" className="ghostButton"  disabled={!this.props.changeMeetingTime} onClick={this.props.onCancelChangeMeeting}>Cancel</Button>
                
                <div className='meetingPlanner'>
                  <p>
                    Choose a reocurring chat time
                 </p>
                  <div className="p">
                  <FrequencyInput
                    frequency={this.props.meetingInfo.frequency}
                    onSetFrequency={this.props.onSetMeetingInfo}
                    changeMeetingTime={this.props.changeMeetingTime}
                  />
                </div>
                  {this.props.meetingInfo.frequency === 'daily' &&
                    <div className={this.props.changeMeetingTime ? '': 'inputDisabled'}>
                      <p>Every day at </p>
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
              </div>  
            </div>
          )
    }
}

