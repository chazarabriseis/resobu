import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent,TextField, DialogContentText } from '@material-ui/core'
import { withRouter } from "react-router";
import { Auth} from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';

import EmployeesTab from '../../Components/AccountPage/EmployeesTab'
import MeetingTab from '../../Components/AccountPage/MeetingTab'
import InviteTab from '../../Components/AccountPage/InviteTab'
import TodoTab from '../../Components/AccountPage/TodoTab'

import _ from "lodash" 

import 'react-tabs/style/react-tabs.css'
import './Account.css'
import '../../App.css'


class ConferenceAccount extends React.Component {
  constructor(props) {
    super(props);
    this.fetchEmployeeList = this.fetchEmployeeList.bind(this);
    this.fetchMeetingInfo = this.fetchMeetingInfo.bind(this);
    this.addEmployeeList = this.addEmployeeList.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.editTableEntry = this.editTableEntry.bind(this);

    this.state = {
      initialState: {},

      employeeList: [{employeeId: 1, employeeEmail: '1@test.com', teamColleagues: ['2@test.com','3@test.com'] , projectColleagues: ['4@test.com','6@test.com'] , userSubId: ''},
                     {employeeId: 2, employeeEmail: '2@test.com', teamColleagues: ['1@test.com','3@test.com'] , projectColleagues: [] , userSubId: ''},
                     {employeeId: 3, employeeEmail: '3@test.com', teamColleagues: ['2@test.com','1@test.com'] , projectColleagues: [] , userSubId: ''},
                     {employeeId: 4, employeeEmail: '4@test.com', teamColleagues: ['5@test.com','6@test.com'] , projectColleagues: ['1@test.com','6@test.com'] , userSubId: ''},
                     {employeeId: 5, employeeEmail: '5@test.com', teamColleagues: ['4@test.com','6@test.com'] , projectColleagues: [] , userSubId: ''},
                     {employeeId: 6, employeeEmail: '6@test.com', teamColleagues: ['4@test.com','5@test.com'] , projectColleagues: ['1@test.com','4@test.com'] , userSubId: ''}],
      isLoadingEmployeeList: false,
      meetingInfo : { frequency: 'monthly', startDate: "2021-01-01", endDate: "2033-01-01",
                      weekday: 'friday', time: '11:30', weekOfMonth: 'last', userSubId: '', 
                      todo_list: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false},
                      inviteText: 'Helloooo, you are selected for this round of our Social Butterfly Meetings on XXX.XXX.',
                      todoList: {enteredEmails: false, personalisedInvite: true, scheduledMeeting: false, choseMeetingTime: false}
                    },
      isLoadingMeetingInfoList: false,

      showAddEmployeeeDialog: false,
      emailList: '',

      showEditEmployeeeDialog: false,
      teamListHTML: '',
      projectListHTML: '',
      teamListStates: [],
      projectListStates: [],
      allEmails: [],
      
      showDeleteDialog: false,
      selectedEmailId: [],
      selectedEmail: '',
      selectedEmailTableId: -1,
      
      changeMeetingTime: false,
      changeInvite: false,
      changeTodoList: false
    }
  }

  async componentDidMount () {
    const userInfoAll = await Auth.currentUserInfo();
    if (userInfoAll) {
      const username = userInfoAll.attributes.email
      const userSubId = userInfoAll.attributes.sub
      this.props.onSignIn(username, userSubId)
      // await this.fetchEmployeeList();  
      // await this.fetchMeetingInfo();
    } 
  }

  async fetchEmployeeList() {  
    // backend call to get employee list  
    console.log('Fetching Employee List')
    /*
    this.setState({
      isLoadingEmployeeList: true
    })

    // POST request to get employee DB
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.state.userInfo.userSubId,
          request_type: 'fetch',
          table_name: 'employees',
          columns_to_get: []
      }
    })
    .then(response => {
      const resultList = response['meeting_info']
      this.setState({meetingInfo: resultList})
    }) 
    .catch(e => {
      toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
      })
    })

    this.setState({
      isLoadingEmployeeList: false
    })
    */
  }

  async fetchMeetingInfo() {  
    // backend call to get meeting info 
    console.log('Fetching Meeting Info')
    /*
    this.setState({
      isLoadingMeetingInfoList: true
    })
    
    // POST request to get meetingInfo from DB
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.state.userInfo.userSubId,
          request_type: 'fetch',
          table_name: 'meetings',
          columns_to_get: []
      }
    })
    .then(response => {
      const resultList = response['meeting_info']
      this.setState({meetingInfo: resultList})
    }) 
    .catch(e => {
      toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
      })
    })

    this.setState({
      isLoadingMeetingInfoList: false
    })
    
    */
    
  }


  openAddEmployeeeDialog = () => {
    this.setState({showAddEmployeeeDialog: true})
  }

  closeAddEmployeeeDialog = () => {
    this.setState({showAddEmployeeeDialog: false})
  }

  checkEnteredEmails = () => {
    if (this.state.emailList=== '') {
      toast.warning("Oops, you haven't entered any emails yet.", {
        position: toast.POSITION.TOP_RIGHT
      })
      return []
    } else {
      const emails = this.state.emailList.split(',')
      for (let i=0; i<emails.length; i++) {
        if (!emails[i].includes('@') || emails[i].length < 1) {
          toast.warning("Hmm, are you sure these are all emails?", {
            position: toast.POSITION.TOP_RIGHT
          })
          return []
        }
      }  
      return emails
    }
  } 

  createEmployeeTableEntries = (emails) => {
    const emailList = emails.map(function(item) {
      return {email: item.toLowerCase(),
              projectColleagues: [],
              teamColleagues: [],
              connectedColleagues: [],
              userSubId: this.state.userInfo.userSubId}
    })
    
    return emailList
  }

  async addEmployeeList () {   
    // backened call to add employee list
    const emails = this.checkEnteredEmails()
    console.log('adding', emails)
    if (emails.length === 0) {
      return
    } else {
      /*
      const emailList = this.createEmployeeTableEntries(emails)
      
        // POST toadd emails to DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                usertoken: this.state.userInfo.userSubId,
                request_type: 'insert',
                table_name: 'employees'
                list_to_insert: emailList
            }
        })
        .then(response => {
              if (response['errorType'] === 'Key already exists') {
                  toast.warning("Sorry, there was a problem connecting to the DB.", {
                    position: toast.POSITION.TOP_RIGHT
                  })  
              } else if (response['errorType'] === 'Add successful') {
                  toast.success("Emails were succesfully added ", {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  this.setState({
                    showAddEmployeeeDialog: false,
                    emailList: ''
                  })
                  this.fetchEmployeeList();
              }
        })
        .catch(e => {
            toast.warning("Sorry, there was a problem connecting to the DB.", {
              position: toast.POSITION.TOP_RIGHT
            })  
        })
      */ 
    
      this.setState({
        showAddEmployeeeDialog: false,
        emailList: ''
      })
    }
  } 


  triggerOpenEditDialog = () => {
    const currentState = _.cloneDeep(this.state)
    if (this.state.selectedEmailId.length === 0) {
      toast.warning("There is no entry selected that could be edited", {
        position: toast.POSITION.TOP_RIGHT
      })
      return 
    }
    // get list of all emails
    const employeeList = [...this.state.employeeList]
    const emails = employeeList.map(function(item) {
      return item.employeeEmail
    })
    
    const teamList = employeeList[this.state.selectedEmailTableId].teamColleagues
    const projectList = employeeList[this.state.selectedEmailTableId].projectColleagues

    const teamListStates = emails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        let sameTeam = false
        if (teamList.includes(item)) {
          sameTeam = true
        }
        return sameTeam
      }
    })
    
    const projectListStates = emails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        let sameTeam = false
        if (projectList.includes(item)) {
          sameTeam = true
        }
        return sameTeam
      }
    })

    this.setState({
      teamListStates: teamListStates,
      projectListStates: projectListStates,
      initialState: currentState,
      allEmails: emails
    }, () => this.openEditEmployeeeDialog())
  }

  createTeamHTML = () => {
    const teamListHTML = this.state.allEmails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        return <li key= {item}> 
                  <input id='team' type="checkbox" value={item} checked={this.state.teamListStates[index]} onChange={this.editEmployeeEntry}/>
                  <label> {item} </label> 
                </li>
      }
    })
    return teamListHTML
  }

  createProjectHTML = () => {
    const projectListHTML = this.state.allEmails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        return <li key= {item}>  
                  <input id='project' type="checkbox" value={item} checked={this.state.projectListStates[index]} onChange={this.editEmployeeEntry}/>
                  <label> {item} </label> 
                </li>
      }
    })
    return projectListHTML
  }

  openEditEmployeeeDialog = () => {
    this.setState({showEditEmployeeeDialog: true})
  }

  updateSelectedEmailId = (selectedEmailId, selectedEmail) => {
    const selectedEmailTableId = this.state.employeeList.findIndex(data => data.employeeId === selectedEmailId[0])
    this.setState({ 
      selectedEmailId: selectedEmailId,
      selectedEmail: selectedEmail,
      selectedEmailTableId: selectedEmailTableId
    })
  }

  editEmployeeEntry = (e) => {
      // change the employeeList and the teamList/projectListStates accordingly
      const employeeEmail = this.state.selectedEmail[0]
      const connectedEmail = e.target.value
      const table = e.target.id
      
      let newEmployeeData = _.cloneDeep(this.state.employeeList[this.state.selectedEmailTableId])
      let newEmployeeList = _.cloneDeep(this.state.employeeList)
      const indexConnectingEmail = newEmployeeList.findIndex(data => data.employeeEmail === connectedEmail)

      if (table === "project") {
          // update the checkbox state
          let newProjectListStates = _.cloneDeep(this.state.projectListStates)
          const teamListIndex = this.state.allEmails.findIndex(data => data === connectedEmail)
          let currentValue = newProjectListStates[teamListIndex]
          newProjectListStates[teamListIndex] = !currentValue
          // update the projectColleagues List in employeeList state for the email that is edited
          let newProjectColleagues = newEmployeeData.projectColleagues
          if (newProjectColleagues.includes(connectedEmail)) {
            const indexProject = newProjectColleagues.findIndex(data => data === connectedEmail)
            newProjectColleagues.splice(indexProject,1)
          } else {
            newProjectColleagues.push(connectedEmail)
          }
          newEmployeeList[this.state.selectedEmailTableId].projectColleagues = newProjectColleagues
          // update the projectColleagues List in employeeList state for the email that is selected
          let newConnectingEmployeeData = newEmployeeList[indexConnectingEmail]
          newProjectColleagues = newConnectingEmployeeData.projectColleagues
          if (newProjectColleagues.includes(employeeEmail)) {
            const indexProject = newProjectColleagues.findIndex(data => data === employeeEmail)
            newProjectColleagues.splice(indexProject,1)
          } else {
            newProjectColleagues.push(employeeEmail)
          }
          newEmployeeList[indexConnectingEmail].projectColleagues = newProjectColleagues

          this.setState({
            employeeList: newEmployeeList,
            projectListStates: newProjectListStates
          })                  
      } else if (table === "team") {
          // update the checkbox state
          let newTeamListStates = _.cloneDeep(this.state.teamListStates)
          const teamListIndex = this.state.allEmails.findIndex(data => data === connectedEmail)
          let currentValue = newTeamListStates[teamListIndex]
          newTeamListStates[teamListIndex] = !currentValue
          // update the employeeList state
          let newTeamColleagues = newEmployeeData.teamColleagues
          if (newTeamColleagues.includes(connectedEmail)) {
            const indexProject = newTeamColleagues.findIndex(data => data === connectedEmail)
            newTeamColleagues.splice(indexProject,1)
          } else {
            newTeamColleagues.push(connectedEmail)
          }
          newEmployeeList[this.state.selectedEmailTableId].teamColleagues = newTeamColleagues
          // update the teamColleagues List in employeeList state for the email that is selected
          let newConnectingEmployeeData = newEmployeeList[indexConnectingEmail]
          newTeamColleagues = newConnectingEmployeeData.teamColleagues
          if (newTeamColleagues.includes(employeeEmail)) {
            const indexProject = newTeamColleagues.findIndex(data => data === employeeEmail)
            newTeamColleagues.splice(indexProject,1)
          } else {
            newTeamColleagues.push(employeeEmail)
          }
          newEmployeeList[indexConnectingEmail].teamColleagues = newTeamColleagues

          this.setState({
            employeeList: newEmployeeList,
            teamListStates: newTeamListStates
          })
      }
  }

  sendEmployeeChangesToDB = () => {
    console.log('saving employees changes to DB')
    // editTableEntry('employees', {})
    this.setState({showEditEmployeeeDialog: false})
  }

  async editTableEntry(tableName, changes){   
    console.log('editing table entry')
    /*
        // POST to edit table entry in DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                usertoken: this.state.userInfo.userSubId,
                request_type: 'edit',
                table_name: tableName,
                changes: changes
            }
        })
        .then(response => {
              if (response['errorType'] === 'Key already exists') {
                  toast.warning("Sorry, there was a problem connecting to the DB.", {
                    position: toast.POSITION.TOP_RIGHT
                  })  
              } else if (response['errorType'] === 'Delete successful') {
                  toast.success("Email was succesfully deleted ", {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  this.setState({
                    showDeleteEmployeeeDialog: false,
                    selectedEmail: '',
                    selectedEmailId: []
                  })
                  this.fetchEmployeeList();
              }
        })
        .catch(e => {
            toast.warning("Sorry, there was a problem connecting to the DB.", {
              position: toast.POSITION.TOP_RIGHT
            })  
        })
      */
  } 


  openDeleteDialog = () => {
    if (this.state.selectedEmailId.length === 0) {
        toast.warning("There is no entry selected that could be deleted", {
          position: toast.POSITION.TOP_RIGHT
        })
        return 
    } else {
      this.setState({showDeleteDialog: true})
    }
  }

  closeDeleteDialog = () => {
    this.setState({showDeleteDialog: false})
  }

  async deleteEmployee () {   
    // backened call to delete employee
    console.log(`delete employee ${this.state.selectedEmail}`) 
    /*
        // POST to delete emails to DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                usertoken: this.state.userInfo.userSubId,
                request_type: 'delete',
                table_name: 'employees',
                column_name: 'email_id',
                email_id_to_delete: this.state.selectedEmailId,
                email_to_delete: this.state.selectedEmail
            }
        })
        .then(response => {
              if (response['errorType'] === 'Key already exists') {
                  toast.warning("Sorry, there was a problem connecting to the DB.", {
                    position: toast.POSITION.TOP_RIGHT
                  })  
              } else if (response['errorType'] === 'Delete successful') {
                  toast.success("Email was succesfully deleted ", {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  this.setState({
                    showDeleteEmployeeeDialog: false,
                    selectedEmail: '',
                    selectedEmailId: []
                  })
                  this.fetchEmployeeList();
              }
        })
        .catch(e => {
            toast.warning("Sorry, there was a problem connecting to the DB.", {
              position: toast.POSITION.TOP_RIGHT
            })  
        })
      */
    this.closeDeleteDialog()
  }


  setMeetingInfo = (e) => {
    let newValue = e.target.value
    let infoToChange = e.target.id
    if (e.target.className === "frequency") { infoToChange = "frequency" } 
    if (e.target.className === "todoList") { 
      infoToChange = "todoList"
      const todoListItemToChange = e.target.value
      const currentValue = this.state.meetingInfo.todoList[todoListItemToChange]
      newValue = { ...this.state.meetingInfo.todoList, [todoListItemToChange] : !currentValue}
      infoToChange = "todoList"
    }
    const newMeetingInfo = { ...this.state.meetingInfo, [infoToChange] : newValue}
    this.setState({meetingInfo: newMeetingInfo})  
  }

  changeMeeting = () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      changeMeetingTime: true,
      initialState: currentState
    })
  }

  cancelChange = () => {
    // revert to state before someone started changing the meeting time
    const initialState = this.state.initialState 
    this.setState(initialState)
  }

  saveChangeMeeting = () => {
    // submit changes to backend
    console.log('sending changes to DB')
    this.editTableEntry('meetingInfo', {userSubId: this.state.userInfo.userSubId}, this.state.meetingInfo)
    this.setState({changeMeetingTime: false})
  }


  changeInviteText= () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      changeInvite: true,
      initialState: currentState
    })
  }

  saveChangeInviteText = () => {
    // submit changes to backend
    console.log('sending changes to DB')
    this.setState({changeInvite: false})
  }


  changeTodoList= () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      changeTodoList: true,
      initialState: currentState
    })
  }

  saveChangeTodoList = () => {
    // submit changes to backend
    console.log('sending changes to DB')
    this.setState({changeTodoList: false})
  }


  render() {
    return (
        <div>
        <div className="topSection">
            <div className="heading1"> Your social butterfly meetings</div>
        </div>
        <div className="sections"> 
            <div className="section1">
            <div className="sectionHeader"></div>
            <div className="sectionContent">
                <Tabs style={{ width: '90%'}}>
                <TabList>
                    <Tab> People List </Tab>
                    <Tab> Meeting Time </Tab>
                    <Tab> Meeting Invite </Tab>
                    <Tab> To Do List </Tab>
                </TabList>
                <TabPanel>
                    <EmployeesTab
                    employeeList={this.state.employeeList}
                    isLoadingEmployeeList={this.state.isLoadingEmployeeList}
                    onOpenAddEmployeeeDialog={this.openAddEmployeeeDialog}
                    onOpenEditEmployeeeDialog={this.triggerOpenEditDialog}
                    onOpenDeleteDialog={this.openDeleteDialog}
                    selectedEmailId={this.state.selectedEmailId}
                    onUpdateSelectedEmailId={this.updateSelectedEmailId}
                    />
                </TabPanel>
                <TabPanel>
                    <MeetingTab
                    changeMeetingTime={this.state.changeMeetingTime}
                    meetingInfo={this.state.meetingInfo}
                    onChangeMeeting={this.changeMeeting}
                    onSaveChangeMeeting={this.saveChangeMeeting}
                    onCancelChangeMeeting={this.cancelChange}
                    onSetMeetingInfo={this.setMeetingInfo}
                    />
                </TabPanel>
                <TabPanel>
                    <InviteTab
                    changeInvite={this.state.changeInvite}
                    inviteText={this.state.meetingInfo.inviteText}
                    onChangeInviteText={this.changeInviteText}
                    onSaveChangeInviteText={this.saveChangeInviteText}
                    onCancelChangeInviteText={this.cancelChange}
                    onSetInviteText={this.setMeetingInfo}
                    />
                </TabPanel>
                <TabPanel>
                    <TodoTab
                    changeTodoList={this.state.changeTodoList}
                    todoList={this.state.meetingInfo.todoList}
                    onChangeTodoList={this.changeTodoList}
                    onSaveChangeTodoList={this.saveChangeTodoList}
                    onCancelChangeTodoList={this.cancelChange}
                    onSetTodoList={this.setMeetingInfo}
                    />
                </TabPanel>
                </Tabs>
            </div>
            </div>      
        </div>
        <Dialog 
            open={this.state.showAddEmployeeeDialog} 
        >
            <DialogTitle>Add People</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Either enter a list of emails separated by a comma or just a single one. You cann add project and team colleagues later by editing entries. 
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                value={this.state.emailList}
                onChange={event => this.setState({ emailList: event.target.value })}
                error={!this.state.emailList.includes('@') || this.state.emailList.length < 1} 
                helperText={!this.state.emailList.includes('@') || this.state.emailList.length < 1 ? 'A valid email address is required' : ' '} 
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.addEmployeeList} className="actionButton">
                Add People
            </Button>
            <Button onClick={this.cancelChange} className="ghostButton">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog 
            open={this.state.showEditEmployeeeDialog} 
        >
            <DialogTitle>Add Connections for {this.state.selectedEmail}</DialogTitle>
            <DialogContent style={{height: "300px"}}>
            <DialogContentText>
                You can add team and project colleagues so we know who is already connected. 
            </DialogContentText>
            <div className="container">
                <div>
                <div> Team Colleagues</div>  
                <ul style= {{listStyle: 'none'}}>
                    {this.createTeamHTML()}
                </ul>  
                </div>   
                <div>           
                <div> Project Colleagues</div>  
                <ul style= {{listStyle: 'none'}}>
                    {this.createProjectHTML()}
                </ul>  
                </div>  
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.sendEmployeeChangesToDB} className="actionButton">
                Save 
            </Button>
            <Button onClick={this.cancelChange} className="ghostButton">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.showDeleteDialog}
        >
            <DialogTitle>{"Confirm deletion"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Do you really want to delete {this.state.selectedEmail}?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.deleteEmployee} className="actionButton">
                Confirm
            </Button>
            <Button onClick={this.closeDeleteDialog} className="ghostButton">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        <ToastContainer />
    </div>
    )
  }
}

export default withRouter(ConferenceAccount);