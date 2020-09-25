import React, { Component } from 'react';
import { FormControl, Select } from '@material-ui/core'


export default class WeekdayInput extends Component {

    render() {  
        const optionValues = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday']
        return (
            <div>
                <FormControl disabled={!this.props.changeMeetingTime}>
                    <Select
                        native
                        value={this.props.weekday}
                        onChange={this.props.onSetWeekday}
                        id='weekday'
                    >
                    {optionValues.map((item) => <option key={item} value={item}>{item}</option>)}
                    </Select>
                </FormControl>
            </div>          
        )
    }
}

