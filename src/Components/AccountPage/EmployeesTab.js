import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import EmployeesTable from '../../Components/AccountPage/EmployeesTable'
import './tabs.css'


export default class EmployeesTab extends Component {

  render() {  
    return (
      <div className="tab">
        <div className="tabContent">
          <Button variant="contained" size="large" className="actionButton" onClick={this.props.onOpenAddEmployeeeDialog}>Add Employees</Button>   
          <Button variant="contained" size="large" className="actionButton" onClick={this.props.onOpenEditEmployeeeDialog}>Add/Remove Colleague Connections</Button>   
          <Button variant="contained" size="large" className="ghostButton" onClick={this.props.onOpenDeleteDialog}>Delete Selected Employee</Button>   
          <EmployeesTable
            employeeList = {this.props.employeeList}
            isLoadingEmployeeList = {this.props.isLoadingEmployeeList}
            selectedEmailId = {this.props.selectedEmailId}
            onUpdateSelectedEmailId={this.props.onUpdateSelectedEmailId}
          />
        </div>  
      </div>
    )
  }

}

