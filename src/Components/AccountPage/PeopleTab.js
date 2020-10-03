import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import PeopleTable from '../../Components/AccountPage/PeopleTable'
import './tabs.css'


export default class PeopleTab extends Component {

  render() {  
    return (
      <div className="tab">
        <div className="tabContent">
          <Button variant="contained" size="large" className="actionButton" onClick={this.props.onOpenAddPersonDialog}>Add Employees</Button>   
          <Button variant="contained" size="large" className="actionButton" onClick={this.props.onOpenEditPersonDialog}>Add/Remove Colleague Connections</Button>   
          <Button variant="contained" size="large" className="ghostButton" onClick={this.props.onOpenDeleteDialog}>Delete Selected Employee</Button>   
          <PeopleTable
            peopleList = {this.props.peopleList}
            isLoadingPeopleList = {this.props.isLoadingPeopleList}
            selectedEmailId = {this.props.selectedEmailId}
            onUpdateSelectedEmailId={this.props.onUpdateSelectedEmailId}
          />
        </div>  
      </div>
    )
  }

}

