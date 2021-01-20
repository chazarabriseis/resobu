import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import AttributeTable from '../../Components/AccountPage/AttributeTable'
import './tabs.css'


export default class ConnectionAI extends Component {

  render() {  
    return (
      <div className="tab">
        <div className="tabContent">
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenAddPersonDialog}>{this.props.userInfo.groupType === 'Business' ? 'Add Attribute' : 'Add Attribute'}</Button>   
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenEditPersonDialog} disabled={this.props.userInfo.subscription=== 'Basic' ? true : false} >Add Constraint</Button>   
          <Button variant="contained" className="ghostButton" onClick={this.props.onOpenEditPersonDialog} disabled={this.props.userInfo.subscription=== 'Basic' ? true : false} >Change Selected Constraint</Button>   
          <div style={{ margin: '40px'}}></div>
          <AttributeTable 
            peopleList = {this.props.peopleList}
            isLoadingPeopleList = {this.props.isLoadingPeopleList}
            onUpdateSelectedEmail={this.props.onUpdateSelectedEmail}
            userInfo={this.props.userInfo}
          />
        </div>  
      </div>
    )
  }

}

