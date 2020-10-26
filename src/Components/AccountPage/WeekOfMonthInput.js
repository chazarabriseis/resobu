import React, { Component } from 'react';
import { FormControl, Select } from '@material-ui/core'


export default class WeekOfMonthInput extends Component {

    render() {  
        return (
            <div>
                <FormControl disabled={!this.props.changeMeetingTime}>
                    <Select
                        native
                        value={this.props.weekOfMonth}
                        onChange={this.props.onSetWeekOfMonth}
                        id='weekOfMonth'
                    >
                    <option value={'first'}>first</option>
                    <option value={'second'}>second</option>
                    <option value={'third'}>third</option>
                    <option value={'fourth'}>last</option>
                    </Select>
                </FormControl>
            </div>
        )
    }
    
}

