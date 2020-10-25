import React, { Component } from 'react';
import { TextField } from '@material-ui/core'


export default class TimeInput extends Component {

    render() {  
        return (
            <div>
                <TextField
                    disabled={!this.props.changeMeetingTime}
                    onChange={this.props.onSetTime}
                    id="chatTime"
                    type="time"
                    value={this.props.chatTime}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 600, // 5 min
                    }}
                > 
                </TextField>
            </div>        
        )
    }
}

