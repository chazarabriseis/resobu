import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import PeopleTable from '../../Components/AccountPage/PeopleTable'
import './tabs.css'


export default class ConnectionAI extends Component {

  render() {  
    return (
      <div className="tab">
        <div className="tabContent">
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenAddPersonDialog}>{this.props.userInfo.groupType === 'Business' ? 'Add Employees' : 'Add People'}</Button>   
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenEditPersonDialog} disabled={this.props.userInfo.subscription=== 'Basic' ? true : false} >Add/Remove Connections</Button>   
          <Button variant="contained" className="ghostButton" onClick={this.props.onOpenDeleteDialog}>{this.props.userInfo.groupType === 'Business' ? 'Delete Selected Employee' : 'Delete Selected Person'}</Button>   

        </div>  
      </div>
    )
  }

}

