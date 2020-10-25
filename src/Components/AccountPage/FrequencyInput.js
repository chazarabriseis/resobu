import React, { Component } from 'react';


export default class FrequencyInput extends Component {

    render() {  
        return (
            <p>
                <input id="frequency_weekly" className="frequency" type="radio" value='weekly' checked={this.props.frequency === "weekly"} disabled={!this.props.changeMeetingTime?"disabled":""} onChange={this.props.onSetFrequency}/>
                <label htmlFor="frequency_weekly">Weekly</label>
                <input id="frequency_fortnightly" className="frequency" type="radio" value='fortnightly' checked={this.props.frequency === "fortnightly"} disabled={!this.props.changeMeetingTime?"disabled":""} onChange={this.props.onSetFrequency}/>
                <label htmlFor="frequency_fortnightly">Fortnightly</label> 
                <input id="frequency_monthly" className="frequency" type="radio" value='monthly' checked={this.props.frequency === "monthly"} disabled={!this.props.changeMeetingTime?"disabled":""} onChange={this.props.onSetFrequency}/>
                <label htmlFor="frequency_monthly">Monthly</label>
            </p>    
        )
    }
}

