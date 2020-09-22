import React, { Component } from 'react';
import { FormControl, Select } from '@material-ui/core'


export default class WeekdayInput extends Component {

    render() {  
        return (
            <div>
                <FormControl disabled={!this.props.changeMeetingTime}>
                    <Select
                        native
                        value={this.props.weekday}
                        onChange={this.props.onSetWeekday}
                        id='weekday'
                    >
                    <option value={'monday'}>Monday</option>
                    <option value={'tuesday'}>Tuesday</option>
                    <option value={'wednesday'}>Wednesday</option>
                    <option value={'thursday'}>Thursday</option>
                    <option value={'friday'}>Friday</option>
                    </Select>
                </FormControl>
            </div>          
        )
    }
}

