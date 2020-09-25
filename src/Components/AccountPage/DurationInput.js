import React, { Component } from 'react';
import { FormControl, Select } from '@material-ui/core'


export default class DurationInput extends Component {

    render() {  

        const optionValues = ['5','10','15','20','25','30','35','40','45','50','60']
        return (
            <div>
                <FormControl disabled={!this.props.changeMeetingTime}>
                    <Select
                        native
                        value={this.props.duration}
                        onChange={this.props.onSetDuration}
                        id='duration'
                    >
                    {optionValues.map((item) => <option key={item} value={item}>{item} minutes</option>)}
                    </Select>
                </FormControl>
            </div>          
        )
    }
}

