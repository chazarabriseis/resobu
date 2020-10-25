import React, { Component } from 'react';
import { FormControl, Select } from '@material-ui/core'


export default class ChatSizeInput extends Component {

    render() {  
        const optionValues = ['2','3','4']
        return (
            <div>
                <FormControl disabled={!this.props.changeMeetingTime}>
                    <Select
                        native
                        value={this.props.chatSize}
                        onChange={this.props.onSetChatSize}
                        id='chatSize'
                    >
                    {optionValues.map((item) => <option key={item} value={item}>{item}</option>)}
                    </Select>
                </FormControl>
            </div>          
        )
    }
}

