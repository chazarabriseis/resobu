import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import PeopleTable from '../../Components/AccountPage/PeopleTable'
import './tabs.css'


export default class PeopleTab extends Component {

  render() {  
    return (
      <div className="tab">
        <div className="tabContent">
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenAddPersonDialog}>{this.props.userInfo.groupType === 'Business' ? 'Add Employees' : 'Add People'}</Button>   
          <Button variant="contained" className="actionButton" onClick={this.props.onOpenEditPersonDialog}>Add/Remove Connections</Button>   
          <Button variant="contained" className="ghostButton" onClick={this.props.onOpenDeleteDialog}>{this.props.userInfo.groupType === 'Business' ? 'Delete Selected Employee' : 'Delete Selected Person'}</Button>   
          <PeopleTable
            peopleList = {this.props.peopleList}
            isLoadingPeopleList = {this.props.isLoadingPeopleList}
            selectedEmailId = {this.props.selectedEmailId}
            onUpdateSelectedEmailId={this.props.onUpdateSelectedEmailId}
            userInfo={this.props.userInfo}
          />
        </div>  
      </div>
    )
  }

}

