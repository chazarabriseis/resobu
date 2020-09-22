import React, { Component } from 'react';
import { TextField } from '@material-ui/core'


export default class TimeInput extends Component {

    render() {  
        return (
            <div>
                <TextField
                    disabled={!this.props.changeMeetingTime}
                    onChange={this.props.onSetTime}
                    id="time"
                    type="time"
                    value={this.props.time}
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

