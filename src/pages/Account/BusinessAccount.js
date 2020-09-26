import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent,TextField, DialogContentText } from '@material-ui/core'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import EmployeesTab from '../../Components/AccountPage/EmployeesTab'
import MeetingTab from '../../Components/AccountPage/MeetingTab'
import InviteTab from '../../Components/AccountPage/InviteTab'
import TodoTab from '../../Components/AccountPage/TodoTab'

import _ from "lodash" 

import 'react-tabs/style/react-tabs.css'
import './Account.css'
import '../../App.css'
import Spinner from '../../Components/Common/Spinner';


class BusinessAccount extends React.Component {
  constructor(props) {
    super(props);
    this.fetchEmployeeList = this.fetchEmployeeList.bind(this);
    this.fetchMeetingInfo = this.fetchMeetingInfo.bind(this);
    this.addEmployeeList = this.addEmployeeList.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.editTableEntry = this.editTableEntry.bind(this);
    this.createEmployeeTableEntries = this.createEmployeeTableEntries.bind(this)

    this.state = {
      initialState: {},

      employeeList: null,
      isLoadingEmployeeList: true,
      meetingInfo: null,
      isLoadingMeetingInfoList: true,

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
    await this.fetchEmployeeList();  
    await this.fetchMeetingInfo();
  }

  async fetchEmployeeList() {  
    const body = {
      usertoken: this.props.userInfo.userSubId,
      request_type: 'listemployees'
    }
    // console.log('Fetching Employee List')
    // console.log(body)
    // backend call to get employee list 
    /*
    this.setState({
      isLoadingEmployeeList: true
    })

    // POST request to get employee DB - tested
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.props.userInfo.userSubId,
          request_type: 'listemployees'
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
    */
    this.setState({
      isLoadingEmployeeList: false,
      employeeList: [
        {employeeId: 11, employeeEmail: '1@test.com', teamColleagues: ['2@test.com','3@test.com'] , projectColleagues: ['4@test.com','6@test.com'], connectedColleagues  : [], userSubId: ''},
        {employeeId: 22, employeeEmail: '2@test.com', teamColleagues: ['1@test.com','3@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {employeeId: 33, employeeEmail: '3@test.com', teamColleagues: ['2@test.com','1@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {employeeId: 44, employeeEmail: '4@test.com', teamColleagues: ['5@test.com','6@test.com'] , projectColleagues: ['1@test.com','6@test.com'], connectedColleagues  : [] , userSubId: ''},
        {employeeId: 55, employeeEmail: '5@test.com', teamColleagues: ['4@test.com','6@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {employeeId: 66, employeeEmail: '6@test.com', teamColleagues: ['4@test.com','5@test.com'] , projectColleagues: ['1@test.com','4@test.com'], connectedColleagues  : [] , userSubId: ''}
      ]
    })
    
  }

  async fetchMeetingInfo() {  
    this.setState({
      isLoadingMeetingInfoList: true
    })
    const body = {
      usertoken: this.props.userInfo.userSubId,
      request_type: 'listmeeting'
    }
    // console.log('Fetching Meeting Info')
    // console.log(body)
    /*
    // POST request to get meetingInfo from DB
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.props.userInfo.userSubId,
          request_type: 'listmeeting'
      }
    })
    .then(response => {
      const resultList = response['meeting_info']
      this.setState({meetingInfo: resultList})

      if (!resultList) {
        await this.createMeeting()
      } else {
        this.setState({
          isLoadingMeetingInfoList: false
        })
      }
    }) 
    .catch(e => {
      toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
      })
    })    
    */
    if (!this.state.meetingInfo) {
      await this.createMeeting()
    }
    
  }

  async createMeeting() {
    const meetingInfo = { frequency: 'monthly', startDate: "2021-01-01", endDate: "2033-01-01", duration: '30',
      weekday: 'friday', time: '11:30', weekOfMonth: 'last',
      inviteText: 'Helloooo, you are selected for this round of our Social Butterfly Chats on XXX.XXX.',
      todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false, choseMeetingTime: false, activated: false},
      activated: false
    }
    const meetingList = [{
      userSubId: this.props.userInfo.userSubId,
      meetingInfo: meetingInfo,
      groupType: this.props.userInfo.groupType,
      subscription: this.props.userInfo.subscription
    }]

    const body = {
      usertoken: this.props.userInfo.userSubId,
      request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
      table_name: 'SocialButterflyChatsTable',
      list_to_insert: meetingList
    }

    // console.log('Creating initial meeting')
    // console.log(body)

    this.setState({
      meetingInfo: meetingInfo,
      isLoadingMeetingInfoList: false
    })

    /*
    // POST to create a meeting in DB   
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.props.userInfo.userSubId,
          request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
          table_name: 'SocialButterflyChatsTable'
          list_to_insert: meetingList
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
                meetingInfo: meetingInfo
              })
          }
    })
    .catch(e => {
        toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
        })  
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
    // also check if the same email was entered twice
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
      // returning a list that removes duplicates 
      return [ ...new Set(emails) ];
    }
  } 

  createEmployeeTableEntries = (emails) => {
    const emailList = emails.map((item) => {
      return {email: item.toLowerCase(), userSubId: this.props.userInfo.userSubId};
    })
    return emailList
  }

  async addEmployeeList () {   
    // backened call to add employee list
    const emails = this.checkEnteredEmails()
    if (emails.length === 0) {
      return
    } else {
      const emailList = this.createEmployeeTableEntries(emails)
      const body = {
        usertoken: this.props.userInfo.userSubId,
        request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
        table_name: 'EmployeesTable',
        list_to_insert: emailList
      }
      // console.log('adding emails')
      // console.log(body)
      /*
        // POST toadd emails to DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                usertoken: this.props.userInfo.userSubId,
                request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
                table_name: 'EmployeesTable',
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
    // also need to change all the other entries of the connected ones...should be collected in the change event
    // console.log('triggering to send emplyee changes to DB')
    const changes = {
      projectColleagues: this.state.employeeList[this.state.selectedEmailTableId].projectColleagues,
      teamColleagues: this.state.employeeList[this.state.selectedEmailTableId].teamColleagues
    }
    this.editTableEntry('EmployeesTable', changes)
    this.setState({showEditEmployeeeDialog: false})
  }

  async editTableEntry(tableName, changes){ 
    let colId = -1
    if (tableName === 'EmployeesTable') {
      colId = this.state.selectedEmailId[0]
    } else if (tableName === 'SocialButterflyChatsTable')  {
      colId = this.props.userInfo.userSubId
    }
    const body = {
      request_type: 'changerowvalues',
      usertoken: this.props.userInfo.userSubId,
      table_name: tableName, // either EmployeesTable or SocialButterflyChatsTable
      col_id: colId,  // either employeeId or userSubId
      changes: changes // dictionary wit column names as key and new values as value
    } 
    // console.log('editing table entry')
    // console.log(body)
    /*
        // POST to edit table entry in DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                request_type: 'changerowvalues',
                usertoken: this.props.userInfo.userSubId,
                table_name: tableName, // either EmployeesTable or SocialButterflyChatsTable
                col_id: colId,  // either employeeId or userSubId
                changes: changes // dictionary wit column names as key and new values as value
            }
        })
        .then(response => {
              if (response['errorMessage'] === 'Add successful') {
                  toast.success("Changes added to DB.", {
                    position: toast.POSITION.TOP_RIGHT
                  })  

                  this.fetchEmployeeList();
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
    const body = {
      requesttype: "deleterow",
      usertoken: this.props.userInfo.userSubId,
      tableName: 'EmployeesTable',
      usertokenColumnName: "userSubId",
      uid: this.state.selectedEmailId[0],
      uidColumnName:  "employeeId"
    }
    // console.log(`delete employee`) 
    // console.log(body)
    /*
        // POST to delete emails to DB - tested   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
              requesttype: "deleterow",
              usertoken: this.props.userInfo.userSubId,
              tableName: 'EmployeesTable',
              usertokenColumnName: "userSubId",
              uid: this.state.selectedEmailId,
              uidColumnName:  "employeeId"
            }
        })
        then(response => {
          try { 
            toast.success("Employee was succesfully deleted", {
              position: toast.POSITION.TOP_RIGHT
            })
          } catch(e) {
            toast.warning("There was a problem deleting this employee", {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        })
      */
    this.closeDeleteDialog()
  }


  setMeetingInfo = (e) => {
    let newValue = e.target.value
    let infoToChange = e.target.id
    if (e.target.id === "activated") { newValue = Boolean(Number(e.target.value)) }
    if (e.target.className === "frequency") { infoToChange = "frequency" } 
    if (e.target.id === "todoList") { 
      const todoListItemToChange = e.target.value
      const currentValue = this.state.meetingInfo.todoList[todoListItemToChange]
      newValue = { ...this.state.meetingInfo.todoList, [todoListItemToChange] : !currentValue}
    }
    let newMeetingInfo = _.cloneDeep(this.state.meetingInfo)
    newMeetingInfo[infoToChange] = newValue
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
    // console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', changes)
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
    // console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', changes)
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
    // console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', changes)
    this.setState({changeTodoList: false})
  }


  render() {

    const PurpleSwitch = withStyles({
      switchBase: {
        '&$checked': {
          color: purple[500],
        },
        '&$checked + $track': {
          backgroundColor: purple[500],
        },
      },
      checked: {},
      track: {},
    })(Switch);

    return (
      <div>
        <div className="topSectionAccount">
          <div className="heading1"> Your remote social butterfly chats</div>
        </div>
        <div className='container whyContent'>
          {!this.state.isLoadingMeetingInfoList && this.state.meetingInfo.activated ?
          <div className='accountStatus accountActivated'> Activated, your invites are being sent out </div>
          :
          <div className='accountStatus accountDeactivated'>Not activated, no invites are being sent out</div>
          }
          {!this.state.isLoadingMeetingInfoList && 
          <FormControlLabel
            control={
              <PurpleSwitch size='medium' disableRipple id='activated' 
                checked={this.state.meetingInfo.activated} onChange={this.setMeetingInfo} 
                name="activated" value={this.state.meetingInfo.activated  ? 0 : 1}
                classes={{switchBase: 'switchBase'}}
              />
            }
            // label={this.state.meetingInfo.activated  ? 'Turn off' : 'Turn on'}
          />
          }
        </div>
        <div className="sections"> 
          <div className="section1">
            <div className="sectionHeader"></div>
            <div className="sectionContent">
              <Tabs style={{ width: '90%'}}>
                <TabList>
                  <Tab> People List </Tab>
                  <Tab> Chat Time </Tab>
                  <Tab> Chat Invite </Tab>
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
                {this.state.isLoadingMeetingInfoList ?
                  <Spinner /> 
                  :
                  <MeetingTab
                    changeMeetingTime={this.state.changeMeetingTime}
                    meetingInfo={this.state.meetingInfo}
                    onChangeMeeting={this.changeMeeting}
                    onSaveChangeMeeting={this.saveChangeMeeting}
                    onCancelChangeMeeting={this.cancelChange}
                    onSetMeetingInfo={this.setMeetingInfo}
                  />
                }
                </TabPanel>
                <TabPanel>
                  {this.state.isLoadingMeetingInfoList ?
                    <Spinner /> 
                    :
                    <InviteTab
                    changeInvite={this.state.changeInvite}
                    inviteText={this.state.meetingInfo.inviteText}
                    onChangeInviteText={this.changeInviteText}
                    onSaveChangeInviteText={this.saveChangeInviteText}
                    onCancelChangeInviteText={this.cancelChange}
                    onSetInviteText={this.setMeetingInfo}
                  />
                  }
                </TabPanel>
                <TabPanel>
                {this.state.isLoadingMeetingInfoList ?
                  <Spinner /> 
                    :
                  <TodoTab
                    changeTodoList={this.state.changeTodoList}
                    todoList={this.state.meetingInfo.todoList}
                    onChangeTodoList={this.changeTodoList}
                    onSaveChangeTodoList={this.saveChangeTodoList}
                    onCancelChangeTodoList={this.cancelChange}
                    onSetTodoList={this.setMeetingInfo}
                  />
                }
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

export default withRouter(BusinessAccount);