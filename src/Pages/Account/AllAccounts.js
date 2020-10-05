import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent,TextField, DialogContentText } from '@material-ui/core'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import PeopleTab from '../../Components/AccountPage/PeopleTab'
import BusinessChatTab from '../../Components/AccountPage/BusinessChatTab'
import ChatTab from '../../Components/AccountPage/ChatTab'
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
    this.fetchPeopleList = this.fetchPeopleList.bind(this);
    this.fetchMeetingInfo = this.fetchMeetingInfo.bind(this);
    this.addPeople = this.addPeople.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.editTableEntry = this.editTableEntry.bind(this);
    this.createPeopleTableEntries = this.createPeopleTableEntries.bind(this)

    this.state = {
      initialState: {},

      peopleList: null,
      isLoadingPeopleList: true,
      meetingInfo: null,
      isLoadingMeetingInfoList: true,

      showAddPeopleDialog: false,
      emailList: '',

      showEditPersonDialog: false,
      showEditEmployeeDialog: false,
      teamListHTML: '',
      projectListHTML: '',
      teamListStates: [],
      projectListStates: [],
      connectedListStates: [],
      allEmails: [],
      collateralChanges: [],
      
      showDeleteDialog: false,
      selectedEmailId: [],
      selectedEmail: '',
      selectedEmailTableId: -1,
      
      changeMeetingTime: false,
      changeInvite: false,
      changeTodoList: false,

      showAddChatDialog: false,
      changeChatTime: false,
      selectedChatId: null,
      selectedChatTableId: null,
      disableChatButtons: true,
      showEditChatDialog: false,
      chatInfo: {date: "2021-01-01", time: '13:30', duration: '30'}
    }
  }

  async componentDidMount () {
    window.scrollTo(0, 0);
    await this.fetchPeopleList();  
    await this.fetchMeetingInfo();
  }

  async fetchPeopleList() {  
    const body = {
      usertoken: this.props.userInfo.userSubId,
      request_type: 'listpeople'
    }
   console.log('Fetching People List')
   console.log(body)
    // backend call to get people list 
    /*
    this.setState({
      isLoadingPeopleList: true
    })

    // POST request to get people DB - tested
    API.post('resobu_api_endpoint', '/rds-request', {
      body: {
          usertoken: this.props.userInfo.userSubId,
          request_type: 'listpeoples'
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
      isLoadingPeopleList: false,
      peopleList: [
        {personId: 11, personEmail: '1@test.com', teamColleagues: ['2@test.com','3@test.com'] , projectColleagues: ['4@test.com','6@test.com'], connectedColleagues  : [], userSubId: ''},
        {personId: 22, personEmail: '2@test.com', teamColleagues: ['1@test.com','3@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {personId: 33, personEmail: '3@test.com', teamColleagues: ['2@test.com','1@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {personId: 44, personEmail: '4@test.com', teamColleagues: ['5@test.com','6@test.com'] , projectColleagues: ['1@test.com','6@test.com'], connectedColleagues  : [] , userSubId: ''},
        {personId: 55, personEmail: '5@test.com', teamColleagues: ['4@test.com','6@test.com'] , projectColleagues: [], connectedColleagues  : [] , userSubId: ''},
        {personId: 66, personEmail: '6@test.com', teamColleagues: ['4@test.com','5@test.com'] , projectColleagues: ['1@test.com','4@test.com'], connectedColleagues  : [] , userSubId: ''}
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
   console.log('Fetching Meeting Info')
   console.log(body)
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
    if (!this.state.meetingInfo && this.props.userInfo.groupType === 'Business') {
      await this.createMeetingBusiness()
    } else if (!this.state.meetingInfo) {
      await this.createMeeting()
    }
    
  }

  async createMeeting () {
    const meetingInfo = { chats: [{id: '2021-01-01_11:30', date: "2021-01-01", time: '11:30', duration: '30'},{id: '2021-01-01_14:30', date: "2021-01-01", time: '14:30', duration: '30'}],
    inviteText: 'Helloooo, you are selected for this round of our Social Butterfly Chats on XXX.XXX.',
    todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false, choseMeetingTime: false, activated: false},
    activated: false
    }
    // [{id: '2021-01-01-11:30', date: "2021-01-01", time: '11:30', duration: '30'}]
    await this.setState({
      meetingInfo: meetingInfo,
      isLoadingMeetingInfoList: false
    })
  }

  async createMeetingBusiness() {
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

   console.log('Creating initial meeting')
   console.log(body)

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


  openAddPersonDialog = () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      showAddPeopleDialog: true,
      initialState: currentState
    })
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

  createPeopleTableEntries = (emails) => {
    const emailList = emails.map((item) => {
      return {email: item.toLowerCase(), userSubId: this.props.userInfo.userSubId};
    })
    return emailList
  }

  async addPeople () {   
    // backened call to add people list
    const emails = this.checkEnteredEmails()
    if (emails.length === 0) {
      return
    } else {
      const emailList = this.createPeopleTableEntries(emails)
      const body = {
        usertoken: this.props.userInfo.userSubId,
        request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
        table_name: 'PeopleTable',
        list_to_insert: emailList
      }
     console.log('adding emails')
     console.log(body)
      /*
        // POST toadd emails to DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                usertoken: this.props.userInfo.userSubId,
                request_type: 'insertrows',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
                table_name: 'PeopleTable',
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
                    showAddPeopleDialog: false,
                    emailList: ''
                  })
                  this.fetchPeopleList();
              }
        })
        .catch(e => {
            toast.warning("Sorry, there was a problem connecting to the DB.", {
              position: toast.POSITION.TOP_RIGHT
            })  
        })
      */ 
    
      this.setState({
        showAddPeopleDialog: false,
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
    const peopleList = [...this.state.peopleList]
    const emails = peopleList.map(function(item) {
      return item.personEmail
    })
    // get information depending on business or other
    if (this.props.userInfo.groupType === 'Business') { 
      const teamList = peopleList[this.state.selectedEmailTableId].teamColleagues
      const projectList = peopleList[this.state.selectedEmailTableId].projectColleagues

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
      }, () => this.openEditEmployeeDialog())

    } else {
      const connectedList = peopleList[this.state.selectedEmailTableId].connectedColleagues
      const connectedListStates = emails.map((item, index) => {
        if (item === this.state.selectedEmail[0]) {
          return null
        } else {
          let sameTeam = false
          if (connectedList.includes(item)) {
            sameTeam = true
          }
          return sameTeam
        }
      })

      this.setState({
        connectedListStates: connectedListStates,
        allEmails: emails
      }, () => this.openEditPersonDialog())
    }
  }

  createTeamHTML = () => {
    const teamListHTML = this.state.allEmails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        return <li key= {item}> 
                  <input id='team' type="checkbox" value={item} checked={this.state.teamListStates[index]} onChange={this.editPersonEntry}/>
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
                  <input id='project' type="checkbox" value={item} checked={this.state.projectListStates[index]} onChange={this.editPersonEntry}/>
                  <label> {item} </label> 
                </li>
      }
    })
    return projectListHTML
  }

  createConnectionHTML = () => {
    const connectedListHTML = this.state.allEmails.map((item, index) => {
      if (item === this.state.selectedEmail[0]) {
        return null
      } else {
        return <li key= {item}>  
                  <input id='connected' type="checkbox" value={item} checked={this.state.connectedListStates[index]} onChange={this.editPersonEntry}/>
                  <label> {item} </label> 
                </li>
      }
    })
    return connectedListHTML
  }

  openEditEmployeeDialog = () => {
    this.setState({showEditEmployeeDialog: true})
  }

  openEditPersonDialog = () => {
    this.setState({showEditPersonDialog: true})
  }

  updateSelectedEmailId = (selectedEmailId, selectedEmail) => {
    const selectedEmailTableId = this.state.peopleList.findIndex(data => data.personId === selectedEmailId[0])
    this.setState({ 
      selectedEmailId: selectedEmailId,
      selectedEmail: selectedEmail,
      selectedEmailTableId: selectedEmailTableId
    })
  }

  editPersonEntry = (e) => {
      // change the peopleList and the teamList/projectListStates accordingly
      const personEmail = this.state.selectedEmail[0]
      const connectedEmail = e.target.value
      const table = e.target.id
      
      let newPersonData = _.cloneDeep(this.state.peopleList[this.state.selectedEmailTableId])
      let newPeopleList = _.cloneDeep(this.state.peopleList)
      let newCollateralChanges = _.cloneDeep(this.state.collateralChanges)
      const tableIndexConnectingEmail = newPeopleList.findIndex(data => data.personEmail === connectedEmail)
      const indexConnectingEmail = newPeopleList[tableIndexConnectingEmail].personId
      const collateralIndex = newCollateralChanges.findIndex(data => data.colId === indexConnectingEmail)

      if (table === "project") {
          // update the checkbox state
          let newProjectListStates = _.cloneDeep(this.state.projectListStates)
          const teamListIndex = this.state.allEmails.findIndex(data => data === connectedEmail)
          let currentValue = newProjectListStates[teamListIndex]
          newProjectListStates[teamListIndex] = !currentValue
          // update the projectColleagues List in peopleList state for the email that is edited
          let newProjectColleagues = newPersonData.projectColleagues
          if (newProjectColleagues.includes(connectedEmail)) {
            const indexProject = newProjectColleagues.findIndex(data => data === connectedEmail)
            newProjectColleagues.splice(indexProject,1)
          } else {
            newProjectColleagues.push(connectedEmail)
          }
          newPeopleList[this.state.selectedEmailTableId].projectColleagues = newProjectColleagues
          // update the projectColleagues List in peopleList state for the email that is selected
          let newConnectingPersonData = newPeopleList[tableIndexConnectingEmail]
          newProjectColleagues = newConnectingPersonData.projectColleagues
          if (newProjectColleagues.includes(personEmail)) {
            const indexProject = newProjectColleagues.findIndex(data => data === personEmail)
            newProjectColleagues.splice(indexProject,1)
          } else {
            newProjectColleagues.push(personEmail)
          }
          newPeopleList[tableIndexConnectingEmail].projectColleagues = newProjectColleagues

          // add changes to collateralChanges that will be commited to the DB when the save button is being pressed.
          if (collateralIndex === -1) {
            newCollateralChanges.push({colId: indexConnectingEmail, changes: {projectColleagues: newProjectColleagues}})
          } else {
            newCollateralChanges[collateralIndex].changes.projectColleagues = newProjectColleagues
          }

          this.setState({
            peopleList: newPeopleList,
            projectListStates: newProjectListStates,
            collateralChanges: newCollateralChanges
          })                  
      } else if (table === "team") {
          // update the checkbox state
          let newTeamListStates = _.cloneDeep(this.state.teamListStates)
          const teamListIndex = this.state.allEmails.findIndex(data => data === connectedEmail)
          let currentValue = newTeamListStates[teamListIndex]
          newTeamListStates[teamListIndex] = !currentValue
          // update the peopleList state
          let newTeamColleagues = newPersonData.teamColleagues
          if (newTeamColleagues.includes(connectedEmail)) {
            const indexProject = newTeamColleagues.findIndex(data => data === connectedEmail)
            newTeamColleagues.splice(indexProject,1)
          } else {
            newTeamColleagues.push(connectedEmail)
          }
          newPeopleList[this.state.selectedEmailTableId].teamColleagues = newTeamColleagues
          // update the teamColleagues List in peopleList state for the email that is selected
          let newConnectingPersonData = newPeopleList[tableIndexConnectingEmail]
          newTeamColleagues = newConnectingPersonData.teamColleagues
          if (newTeamColleagues.includes(personEmail)) {
            const indexProject = newTeamColleagues.findIndex(data => data === personEmail)
            newTeamColleagues.splice(indexProject,1)
          } else {
            newTeamColleagues.push(personEmail)
          }
          newPeopleList[tableIndexConnectingEmail].teamColleagues = newTeamColleagues
          // add changes to collateralChanges that will be commited to the DB when the save button is being pressed.
          if (collateralIndex === -1) {
            newCollateralChanges.push({colId: indexConnectingEmail, changes: {teamColleagues: newTeamColleagues }})
          } else {
            newCollateralChanges[collateralIndex].changes.teamColleagues = newTeamColleagues
          }

          this.setState({
            peopleList: newPeopleList,
            teamListStates: newTeamListStates,
            collateralChanges: newCollateralChanges
          })
      } else if (table === "connected") {
        // update the checkbox state
        let newConnectedListStates = _.cloneDeep(this.state.connectedListStates)
        const connectedListIndex = this.state.allEmails.findIndex(data => data === connectedEmail)
        let currentValue = newConnectedListStates[connectedListIndex]
        newConnectedListStates[connectedListIndex] = !currentValue
        // update the peopleList state
        let newConnectedColleagues = newPersonData.connectedColleagues
        if (newConnectedColleagues.includes(connectedEmail)) {
          const indexProject = newConnectedColleagues.findIndex(data => data === connectedEmail)
          newConnectedColleagues.splice(indexProject,1)
        } else {
          newConnectedColleagues.push(connectedEmail)
        }
        newPeopleList[this.state.selectedEmailTableId].connectedColleagues = newConnectedColleagues
        // update the connectedColleagues List in peopleList state for the email that is selected
        let newConnectingPersonData = newPeopleList[tableIndexConnectingEmail]
        newConnectedColleagues = newConnectingPersonData.connectedColleagues
        if (newConnectedColleagues.includes(personEmail)) {
          const indexProject = newConnectedColleagues.findIndex(data => data === personEmail)
          newConnectedColleagues.splice(indexProject,1)
        } else {
          newConnectedColleagues.push(personEmail)
        }
        newPeopleList[tableIndexConnectingEmail].connectedColleagues = newConnectedColleagues
        // add changes to collateralChanges that will be commited to the DB when the save button is being pressed.
        if (collateralIndex === -1) {
          newCollateralChanges.push({colId: indexConnectingEmail, changes: {connectedColleagues: newConnectedColleagues }})
        } else {
          newCollateralChanges[collateralIndex].changes.connectedColleagues = newConnectedColleagues
        }

        this.setState({
          peopleList: newPeopleList,
          connectedListStates: newConnectedListStates,
          collateralChanges: newCollateralChanges
        })
    }
  }

  sendPersonChangesToDB = () => {
    // also need to change all the other entries of the connected ones...should be collected in the change event
   console.log('triggering to send emplyee changes to DB')
    const changes = {
      projectColleagues: this.state.peopleList[this.state.selectedEmailTableId].projectColleagues,
      teamColleagues: this.state.peopleList[this.state.selectedEmailTableId].teamColleagues
    }
    this.editTableEntry('PeopleTable', this.state.selectedEmailId[0], changes)
    const collateralChanges = this.state.collateralChanges
    for (let i =0; i<collateralChanges.length; i++) {
      this.editTableEntry('PeopleTable', collateralChanges[i].colId, collateralChanges[i].changes)
    }
    this.setState({showEditPersonDialog: false})
  }

  async editTableEntry(tableName, colId, changes){ 
    const body = {
      request_type: 'changerowvalues',
      usertoken: this.props.userInfo.userSubId,
      table_name: tableName, // either PeopleTable or SocialButterflyChatsTable
      col_id: colId,  // either personId or userSubId depeding on the table
      changes: changes // dictionary wit column names as key and new values as value
    } 
   console.log('editing table entry')
   console.log(body)
    /*
        // POST to edit table entry in DB   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
                request_type: 'changerowvalues',
                usertoken: this.props.userInfo.userSubId,
                table_name: tableName, // either PeopleTable or SocialButterflyChatsTable
                col_id: colId,  // either personId or userSubId
                changes: changes // dictionary wit column names as key and new values as value
            }
        })
        .then(response => {
              if (response['errorMessage'] === 'Add successful') {
                  toast.success("Changes added to DB.", {
                    position: toast.POSITION.TOP_RIGHT
                  })  

                  this.fetchPeopleList();
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

  removeDeletedFromPeopleList = (columnName, collateralList, newPeopleList) => {
    const emailToDelete = this.state.selectedEmail[0]
    for (const email in collateralList) {
      const emailIndex = newPeopleList.findIndex(data => data.personEmail === collateralList[email])
      const personId = newPeopleList[emailIndex].personId
      let newColumn = newPeopleList[emailIndex][columnName]
      if (newColumn.includes(emailToDelete)) {
        const indexToDelete = newColumn.findIndex(data => data === emailToDelete)
        newColumn.splice(indexToDelete,1)
      } 
      newPeopleList[emailIndex][columnName] = newColumn

      // send changes to DB as well
      this.editTableEntry('PeopleTable', personId, {[columnName]: newColumn})
    }
    return newPeopleList;
  }

  deletePersonEverywhere = () => {
    let newPeopleList = _.cloneDeep(this.state.peopleList)
    const peopleTableId= this.state.selectedEmailTableId

    // change the peopleList and the teamList/projectListStates accordingly by removing the deleted people
    let projectColleagues = newPeopleList[peopleTableId].projectColleagues
    let teamColleagues =  newPeopleList[peopleTableId].teamColleagues
    let connectedColleagues =  newPeopleList[peopleTableId].connectedColleagues
    
    newPeopleList = this.removeDeletedFromPeopleList('projectColleagues', projectColleagues, newPeopleList)
    newPeopleList = this.removeDeletedFromPeopleList('teamColleagues', teamColleagues, newPeopleList)
    newPeopleList = this.removeDeletedFromPeopleList('connectedColleagues', connectedColleagues, newPeopleList)   

    // delete the people itself from the list 
    newPeopleList.splice(peopleTableId, 1)

    this.setState({peopleList: newPeopleList})
  }

  async deletePerson () {  
    // change all the entries that had the selected people as a team/project/connected colleague
    this.deletePersonEverywhere()
    const body = {
      requesttype: "deleterow",
      usertoken: this.props.userInfo.userSubId,
      tableName: 'PeopleTable',
      usertokenColumnName: "userSubId",
      uid: this.state.selectedEmailId[0],
      uidColumnName:  "personId"
    }
   console.log(`delete person`) 
   console.log(body)
    /*
        // POST to delete emails to DB - tested   
        API.post('resobu_api_endpoint', '/rds-request', {
            body: {
              requesttype: "deleterow",
              usertoken: this.props.userInfo.userSubId,
              tableName: 'PeopleTable',
              usertokenColumnName: "userSubId",
              uid: this.state.selectedEmailId,
              uidColumnName:  "personId"
            }
        })
        then(response => {
          try { 
            toast.success("Person was succesfully deleted", {
              position: toast.POSITION.TOP_RIGHT
            })
          } catch(e) {
            toast.warning("There was a problem deleting this person", {
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
   console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
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
   console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
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
   console.log('triggering to send meeting changes to DB')
    const changes = {meetingInfo: this.state.meetingInfo}
    this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
    this.setState({changeTodoList: false})
  }


  openAddChatDialog = () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      showAddChatDialog: true,
      initialState: currentState
    })
  }

  openEditChatDialog = () => {
    const currentState = _.cloneDeep(this.state)
    const newMeetingInfo = _.cloneDeep(this.state.meetingInfo)
    const selectedChatInfo = newMeetingInfo.chats[this.state.selectedChatTableId]
    console.log(selectedChatInfo)
    this.setState({
      showEditChatDialog: true,
      showAddChatDialog: true,
      initialState: currentState,
      chatInfo: selectedChatInfo
    })
  }

  createChatHTML = () => {
    if (this.state.meetingInfo.chats.length === 0 ) {
      return <p> Please go ahead and add chat times</p>
    } else {
      const chatListHTML = this.state.meetingInfo.chats.map((item, index) => {
        if (item === this.state.selectedEmail[0]) {
          return null
        } else {
          return <div className='chatBox' tabIndex={index} id={item.id} key= {item.id} onClick={this.setSelectedChat}> 
                    <div className='p' id={item.id}>
                      Meeting {index+1}
                    </div>
                    <div className='p' id={item.id}>
                      On {item.date}
                    </div>
                    <div className='p' id={item.id}>
                      at {item.time}
                    </div>
                    <div className='p' id={item.id}>
                      for {item.duration}
                    </div>
                  </div>
        }
      })
      return chatListHTML
    }
  }

  setSelectedChat = (e) => {
    const selectedChatId = e.target.id
    const selectedChatTableId = this.state.meetingInfo.chats.findIndex(data =>  data.id === selectedChatId)
    this.setState({
      selectedChatId: e.target.id,
      selectedChatTableId: selectedChatTableId,
      disableChatButtons: false
    })
  }

  setChatInfo = (e) => {
    const newValue = e.target.value
    const infoToChange = e.target.id
    let newChatInfo = _.clone(this.state.chatInfo)
    newChatInfo[infoToChange] = newValue
    this.setState({chatInfo: newChatInfo})
  }

  saveAddChat = () => {
    // check if coming from edit or add chat
    const chatId = this.state.chatInfo.date + '_' + this.state.chatInfo.time
    if (this.state.chatInfo.id) {
      let newMeetingInfo = _.clone(this.state.meetingInfo)
      // delete selected one
      newMeetingInfo.chats.splice(this.state.selectedEmailTableId,1)
      let chatInfo = _.clone(this.state.chatInfo)
      chatInfo.chatId = chatId
      newMeetingInfo.chats.push(this.state.chatInfo)
      console.log('triggering to send meeting changes to DB')
      const changes = {meetingInfo: newMeetingInfo}
      this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
      this.setState({
        meetingInfo: newMeetingInfo,
        showAddChatDialog: false,
        showEditChatDialog: false
      })
    } else {
      // check if a chat at that time already exists by checking the chatId
      const chatIdIndex = this.state.meetingInfo.chats.findIndex(data => data.id === chatId)
      if (chatIdIndex === -1) {
        let newMeetingInfo = _.clone(this.state.meetingInfo)
        let chatInfo = _.clone(this.state.chatInfo)
        chatInfo.chatId = chatId
        newMeetingInfo.chats.push(this.state.chatInfo)
        console.log('triggering to send meeting changes to DB')
        const changes = {meetingInfo: newMeetingInfo}
        this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
        this.setState({
          meetingInfo: newMeetingInfo,
          showAddChatDialog: false
        })
      } else {
        toast.warning("Ooops, there is already a chat at this time.", {
          position: toast.POSITION.TOP_RIGHT
        })
      } 
    }  
  }


  render() {

    const PurpleSwitch = withStyles({
      switchBase: {
        color: purple[300],
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
          <div className='accountStatus accountActivated'> Activated, move switch to stop sending invites out </div>
          :
          <div className='accountStatus accountDeactivated'>Not activated, move switch to start sending invites out</div>
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
                  <Tab> {this.props.userInfo.groupType === 'Business' ? 'Employees' : 'People'} </Tab>
                  <Tab> Chat Time </Tab>
                  <Tab> Chat Invite </Tab>
                  <Tab> To Do List </Tab>
                </TabList>
                <TabPanel>
                  <PeopleTab
                    peopleList={this.state.peopleList}
                    isLoadingPeopleList={this.state.isLoadingPeopleList}
                    onOpenAddPersonDialog={this.openAddPersonDialog}
                    onOpenEditPersonDialog={this.triggerOpenEditDialog}
                    onOpenDeleteDialog={this.openDeleteDialog}
                    selectedEmailId={this.state.selectedEmailId}
                    onUpdateSelectedEmailId={this.updateSelectedEmailId}
                    userInfo={this.props.userInfo}
                  />
                </TabPanel>
                <TabPanel>
                {this.state.isLoadingMeetingInfoList ?
                  <Spinner /> 
                  :
                  <div>
                    {this.props.userInfo.groupType === 'Business' ?
                    <BusinessChatTab
                      changeMeetingTime={this.state.changeMeetingTime}
                      meetingInfo={this.state.meetingInfo}
                      onChangeMeeting={this.changeMeeting}
                      onSaveChangeMeeting={this.saveChangeMeeting}
                      onCancelChangeMeeting={this.cancelChange}
                      onSetMeetingInfo={this.setMeetingInfo}
                    />
                    :
                    <ChatTab 
                      changeMeetingTime={this.state.changeMeetingTime}
                      meetingInfo={this.state.meetingInfo}
                      onChangeMeeting={this.changeMeeting}
                      onSaveChangeMeeting={this.saveChangeMeeting}
                      onCancelChangeMeeting={this.cancelChange}
                      onSetMeetingInfo={this.setMeetingInfo}
                      onOpenAddChatDialog= {this.openAddChatDialog}
                      showAddChatDialog={this.state.showAddChatDialog}
                      onCreateChatHTML={this.createChatHTML}
                      disableChatButtons={this.state.disableChatButtons}
                      selectedChatTableId={this.state.selectedChatTableId}
                      onOpenEditChatDialog={this.openEditChatDialog}
                      showEditChatDialog={this.state.showEditChatDialog}
                      chatInfo={this.state.chatInfo}
                      onSetChatInfo={this.setChatInfo}
                      onSaveAddChat= {this.saveAddChat}
                    />
                    }
                  </div>
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
          open={this.state.showAddPeopleDialog} 
        >
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Either enter a list of emails separated by a comma or just a single one. You cann add project and team colleagues later by editing single entries. 
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
            <Button onClick={this.addPeople} className="actionButton">
              Add Employees
            </Button>
            <Button onClick={this.cancelChange} className="ghostButton">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          open={this.state.showEditEmployeeDialog} 
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
            <Button onClick={this.sendPersonChangesToDB} className="actionButton">
              Save 
            </Button>
            <Button onClick={this.cancelChange} className="ghostButton">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          open={this.state.showEditPersonDialog} 
        >
          <DialogTitle>Add Connections for {this.state.selectedEmail}</DialogTitle>
          <DialogContent style={{height: "300px"}}>
            <DialogContentText>
              You can add people so we know who is already connected. 
            </DialogContentText>
            <div className="container">
              <div>
                <div> Connections </div>  
                <ul style= {{listStyle: 'none'}}>
                  {this.createConnectionHTML()}
                </ul>  
              </div>   
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.sendPersonChangesToDB} className="actionButton">
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
            <Button onClick={this.deletePerson} className="actionButton">
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