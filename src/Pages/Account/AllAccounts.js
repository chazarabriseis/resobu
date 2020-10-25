import React from 'react'
import { API } from 'aws-amplify';
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
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

class BusinessAccount extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPeopleList = this.fetchPeopleList.bind(this);
    this.fetchMeetingInfo = this.fetchMeetingInfo.bind(this);
    this.addPeople = this.addPeople.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.editTableEntry = this.editTableEntry.bind(this);

    this.state = {
      initialState: {},

      peopleList: [],
      isLoadingPeopleList: true,
      meetingInfo: null,
      nextChats: [],
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
      selectedEmail: '',
      
      changeMeetingTime: false,
      changeInvite: false,
      changeTodoList: false,

      showChatDialog: false,
      changeChatTime: false,
      selectedChatId: null,
      selectedChatTableId: null,
      disableChatButtons: true,
      showEditChatDialog: false,
      chatInfo: {chatDate: "2021-01-01", chatTime: '13:30', chatLength: '30'},
      showDeleteDialogChat: false,

      inviteText: '<p>testin<strong>gdacdac</strong></p><p><strong>acalck</strong></p>'
    }
  }

  async componentDidMount () {
    window.scrollTo(0, 0);
    await this.fetchPeopleList();  
    await this.fetchMeetingInfo();
  }

  async fetchPeopleList() {  
    this.setState({
      isLoadingPeopleList: true
    })

    const _body = {
      user_sub_id: this.props.userInfo.userSubId,
      group_type: this.props.userInfo.groupType,
      request_type: 'read_people'
    }
    let resultList = []
    console.log('Fetching People List')

    //POST request to get people DB - test
    API.post('ReSoBuAPI', '/dynamodb-requests', {
      body: _body
    })
    .then(response => {
      resultList = response['response'][0]['Items']
      for (const result in resultList) { 
        resultList[result]["personEmail"] = resultList[result]["TypeInfo"].replace("PERSON#", "") 
        resultList[result]["personKey"] = result 
        resultList[result]["projectColleagues"] = resultList[result]["info"]["projectColleagues"]
        resultList[result]["connectedColleagues"] = resultList[result]["info"]["connectedColleagues"]
        resultList[result]["teamColleagues"] = resultList[result]["info"]["teamColleagues"]
        resultList[result]["officeLocation"] = resultList[result]["info"]["officeLocation"]
      } 
      this.setState({
        isLoadingPeopleList: false,
        peopleList: resultList
      })
    }) 
    .catch(e => {
      toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
      })
      this.setState({ isLoadingPeopleList: false })
    }) 
  }

  async fetchMeetingInfo() {  
    this.setState({
      isLoadingMeetingInfoList: true
    })
    const _body = {
      user_sub_id: this.props.userInfo.userSubId,
      group_type: this.props.userInfo.groupType,
      request_type: 'read_chat_parent'
    }
   console.log('Fetching Meeting Info')
    // POST request to get meetingInfo from DB
    API.post('ReSoBuAPI', '/dynamodb-requests', {
      body: _body
    })
    .then(response => {
      const resultList = response['response'][0]['Items']
      if (resultList.length === 0) {
        if (!this.state.meetingInfo && this.props.userInfo.groupType === 'Business') {
          this.createMeetingBusiness()
        } else if (!this.state.meetingInfo) {
          this.createMeeting()
        }
      } else {
        const meetingInfo = resultList[0]['info']
        console.log(meetingInfo)
        this.setState({
          isLoadingMeetingInfoList: false,
          meetingInfo: meetingInfo,
        })
      }
    })  
  }

  async createMeeting () {
    console.log('Creating initial meeting')
    const meetingInfo = { chatActivation: false, chats: [{id: '2021-01-01@11:30', chatName: "Chat 1", chatDate: "2021-01-01", chatTime: '11:30', chatLength: '30'},{id: '2021-01-01@14:30', chatName: "Chat 2", chatDate: "2021-01-01", chatTime: '14:30', chatLength: '30'}],
    inviteText: '<p>Hello $NAME$,</p><p><br></p><p>you have a <strong>Remote Social Butterfly Chat</strong> happening on $DATE$ at $TIME$ for $CHATLENGTH$ with $CHATPARTNER$.</p><p>Please get in touch with each other to organise your chat.</p><p><br></p><p>If you have feedback about the Remote Social Butterfly Chats, just reply to this email.</p><p><br></p><p>Happy connecting!</p><p>Your Organizers and the Remote Social Butterfly Team</p>',
    todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false, choseMeetingTime: false, activated: false},
    }

    const _body = {request_type: "create_chat_parent", 
             user_sub_id: this.props.userInfo.userSubId,
             group_type: this.props.userInfo.groupType,
             chat_info: meetingInfo
            }
    // POST to create a meeting in DB   
    API.post('ReSoBuAPI', '/dynamodb-requests', {
      body: _body
    })
    .then(response => {
      console.log("Created initial meeting")
    })
    .catch(e => {
        toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
        })  
    })

    this.setState({
      meetingInfo: meetingInfo,
      isLoadingMeetingInfoList: false
    })
  }

  async createMeetingBusiness() {
    console.log('Creating initial meeting')
    const meetingInfo = {chatActivation: false, nextChats: ['2021-01-01@11:30'],
                      frequency: 'weekly', startDate: "2021-01-01", endDate: "2033-01-01", chatLength: '30',
                      weekday: 'friday', chatTime: '11:30', weekOfMonth: 'last',
                      inviteText: '<p>Hello $NAME$,</p><p><br></p><p>you have a <strong>Remote Social Butterfly Chat</strong> happening on $DATE$ at $TIME$ for $CHATLENGTH$ with $CHATPARTNER$.</p><p>Please get in touch with each other to organise your chat.</p><p><br></p><p>If you have feedback about the Remote Social Butterfly Chats, just reply to this email.</p><p><br></p><p>Happy connecting!</p><p>Your Organizers and the Remote Social Butterfly Team</p>',
                      todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false,
                                 choseMeetingTime: false, activated: false},
                      chatSize: '2'}

    const _body = {request_type: "create_chat_parent", 
             user_sub_id: this.props.userInfo.userSubId,
             group_type: this.props.userInfo.groupType,
             chat_info: meetingInfo
            }
    // POST to create a meeting in DB   
    API.post('ReSoBuAPI', '/dynamodb-requests', {
      body: _body
    })
    .then(response => {
      console.log("Created initial meeting")
    })
    .catch(e => {
        toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
        })  
    })

    this.setState({
      meetingInfo: meetingInfo,
      isLoadingMeetingInfoList: false
    })
  }

  openAddPersonDialog = () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      showAddPeopleDialog: true,
      initialState: currentState
    })
  }

  checkEnteredEmails = () => {
    // TODO: check for weird characters
    if (this.state.emailList=== '') {
      toast.warning("Oops, you haven't entered any emails yet.", {
        position: toast.POSITION.TOP_RIGHT
      })
      return [[], []];
    } else {
      let emails = this.state.emailList.split(',')
      // remove trailing whitesapces
      emails = emails.map((email) => {return email.trim()})
      for (let i=0; i<emails.length; i++) {
        if (!emails[i].includes('@') || emails[i].length < 1) {
          toast.warning("Hmm, are you sure these are all emails? Or is the last character a comma?", {
            position: toast.POSITION.TOP_RIGHT
          })
          return [[], []];
        } 
      } 
      
      // remove duplicates from list 
      emails = [ ...new Set(emails) ]
      let emailsWithoutExistingEmails = _.clone(emails)
      // check if email already exists, if not add it to peopleList
      let newPeopleList = _.cloneDeep(this.state.peopleList)
      let existingEmails = newPeopleList.map((person)=> {return person.personEmail})
      for (let i=0; i<emails.length; i++) {
        if (existingEmails.includes(emails[i])) {
          const index = emailsWithoutExistingEmails.findIndex(email => email === emails[i])
          emailsWithoutExistingEmails.splice(index,1)
        } else {
          let newPerson = {}
          newPerson["personKey"]= existingEmails.length + i - 1
          newPerson["personEmail"]=  emails[i]
          newPerson["projectColleagues"]= []
          newPerson["connectedColleagues"]= []
          newPerson["teamColleagues"]= []
          newPerson["officeLocation"]= ''

          newPeopleList.push(newPerson)
        }
      } 

      return [emailsWithoutExistingEmails, newPeopleList];
    }
  } 

  async addPeople () {   
    // backened call to add people list
    const value = this.checkEnteredEmails()
    const emails = value[0]
    const newPeopleList = value[1]
    if (emails.length === 0) {
      return
    } else {
      const _body = {
        user_sub_id: this.props.userInfo.userSubId,
        group_type: this.props.userInfo.groupType,
        person_info: {teamColleagues: [], projectColleagues: [], connectedColleagues: [], officeLocation: ''},
        request_type: 'create_people',     // check if the for loop should run here or at the backend () what happens if out of 5 entries the third is already entered and throws an error
        emails: emails // list_to_insert: emailList
      }
     console.log('adding emails')
      // POST toadd emails to DB   
      API.post('ReSoBuAPI', '/dynamodb-requests', {
          body: _body
      })
      .then(response => {
        if (response["statusCode"] === 500) {
          toast.warning(response["message"], {
            position: toast.POSITION.TOP_RIGHT
          })  
        } else {
          //this.fetchPeopleList()
          this.setState({peopleList: newPeopleList})
        }
      })
    
      this.setState({
        showAddPeopleDialog: false,
        emailList: ''
      })
    }
  } 


  triggerOpenEditDialog = () => {
    const currentState = _.cloneDeep(this.state)
    if (this.state.selectedEmail.length === 0) {
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
    const selectedEmailTableId = peopleList.findIndex(person => person.personEmail === this.state.selectedEmail[0])
    if (this.props.userInfo.groupType === 'Business') { 
      const teamList = peopleList[selectedEmailTableId].teamColleagues
      const projectList = peopleList[selectedEmailTableId].projectColleagues

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
      const connectedList = peopleList[selectedEmailTableId].connectedColleagues
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

  updateSelectedEmail = (selectedEmail) => {
    this.setState({ 
      selectedEmail: selectedEmail
    })
  }

  editPersonEntry = (e) => {
      // change the peopleList and the teamList/projectListStates accordingly
      const personEmail = this.state.selectedEmail[0]
      const connectedEmail = e.target.value
      const table = e.target.id
      
      let newPeopleList = _.cloneDeep(this.state.peopleList)
      const selectedEmailTableId = newPeopleList.findIndex(person => person.personEmail === personEmail)
      let newPersonData = _.cloneDeep(this.state.peopleList[selectedEmailTableId])
      let newCollateralChanges = _.cloneDeep(this.state.collateralChanges)
      const tableIndexConnectingEmail = newPeopleList.findIndex(data => data.personEmail === connectedEmail)
      const indexConnectingEmail = newPeopleList[tableIndexConnectingEmail].personKey
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
          newPeopleList[selectedEmailTableId].projectColleagues = newProjectColleagues
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
            newCollateralChanges.push({colId: connectedEmail, changes: {projectColleagues: newProjectColleagues}})
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
          newPeopleList[selectedEmailTableId].teamColleagues = newTeamColleagues
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
            newCollateralChanges.push({colId: connectedEmail, changes: {teamColleagues: newTeamColleagues }})
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
        newPeopleList[selectedEmailTableId].connectedColleagues = newConnectedColleagues
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
    console.log('triggering  employee changes to DB')
    this.setState({
      showEditPersonDialog: false, 
      showEditEmployeeDialog: false
    })
    const selectedEmailTableId = this.state.peopleList.findIndex(person => person.personEmail === this.state.selectedEmail[0])
    const changes = {
      projectColleagues: this.state.peopleList[selectedEmailTableId].projectColleagues,
      teamColleagues: this.state.peopleList[selectedEmailTableId].teamColleagues
    }
    this.editTableEntry('PeopleTable', this.state.selectedEmail[0], changes)
    const collateralChanges = this.state.collateralChanges
    for (let i =0; i<collateralChanges.length; i++) {
      this.editTableEntry('PeopleTable', collateralChanges[i].colId, collateralChanges[i].changes)
    }
  }

  async editTableEntry(tableName, colId, changes){ 
    let _body = {}
    if (tableName === "PeopleTable") {
      _body = {
        user_sub_id: this.props.userInfo.userSubId,
        group_type: this.props.userInfo.groupType,
        request_type: 'update_person',
        email: colId,
        changes: changes // dictionary with column names as in DB as key and new values as value
      } 
    }
    if (tableName === "SocialButterflyChatsTable") {
      _body = {
        user_sub_id: this.props.userInfo.userSubId,
        group_type: this.props.userInfo.groupType,
        request_type: 'update_chat_parent',
        changes: changes // dictionary with column names as in DB as key and new values as value
      } 
    }
   console.log('editing table entry')
    // POST to edit table entry in DB   
    API.post('ReSoBuAPI', '/dynamodb-requests', {
        body: _body
    })
    .then(response => {
      // this.fetchPeopleList();
    })
  } 


  openDeleteDialog = () => {
    if (this.state.selectedEmail.length === 0) {
        toast.warning("There is no entry selected that could be deleted", {
          position: toast.POSITION.TOP_RIGHT
        })
        return 
    } else {
      this.setState({showDeleteDialog: true})
    }
  }

  closeDeleteDialog = () => {
    this.setState({
      showDeleteDialog: false,
      showDeleteDialogChat: false
    })
  }

  removeDeletedFromPeopleList = (columnName, collateralList, newPeopleList) => {
    const emailToDelete = this.state.selectedEmail[0]
    for (const email in collateralList) {
      const emailIndex = newPeopleList.findIndex(data => data.personEmail === collateralList[email])
      let newColumn = newPeopleList[emailIndex][columnName]
      if (newColumn.includes(emailToDelete)) {
        const indexToDelete = newColumn.findIndex(data => data === emailToDelete)
        newColumn.splice(indexToDelete,1)
      } 
      newPeopleList[emailIndex][columnName] = newColumn

      // send changes to DB as well
      this.editTableEntry('PeopleTable', collateralList[email], {[columnName]: newColumn})
    }
    return newPeopleList;
  }

  deletePersonEverywhere = () => {
    let newPeopleList = _.cloneDeep(this.state.peopleList)
    const emailToDelete = this.state.selectedEmail[0]
    const peopleTableId= newPeopleList.findIndex(data => data.personEmail === emailToDelete)

    // change the peopleList and the teamList/projectListStates accordingly by removing the deleted people
    let projectColleagues = newPeopleList[peopleTableId].projectColleagues
    let teamColleagues =  newPeopleList[peopleTableId].teamColleagues
    let connectedColleagues =  newPeopleList[peopleTableId].connectedColleagues
    
    newPeopleList = this.removeDeletedFromPeopleList('projectColleagues', projectColleagues, newPeopleList)
    newPeopleList = this.removeDeletedFromPeopleList('teamColleagues', teamColleagues, newPeopleList)
    newPeopleList = this.removeDeletedFromPeopleList('connectedColleagues', connectedColleagues, newPeopleList)   

    // delete the persin itself from the list 
    newPeopleList.splice(peopleTableId, 1)

    return newPeopleList
  }

  async deletePerson () {
    const _body = {
      user_sub_id: this.props.userInfo.userSubId,
      group_type: this.props.userInfo.groupType,
      request_type: "delete_person",
      email: this.state.selectedEmail[0]
    }
    // POST to delete emails to DB - tested   
    API.post('ReSoBuAPI', '/dynamodb-requests', {
        body: _body
    })
    .then(response => {
      if (response["statusCode"] === 200 && response["response"]["ResponseMetadata"]["HTTPStatusCode"] === 200) { 
        // change all the entries that had the selected people as a team/project/connected colleague
        const newPeopleList = this.deletePersonEverywhere()
        this.setState({
          peopleList: newPeopleList, 
          selectedEmail: ''
        })
      } else { 
        toast.warning("There was a problem deleting this person", {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    this.closeDeleteDialog()
    })
  }


  setMeetingInfo = (e) => {
    let newValue = e.target.value
    let infoToChange = e.target.id
    if (e.target.id === "chatActivation") { newValue = Boolean(Number(e.target.value)) }
    if (e.target.className === "frequency") { infoToChange = "frequency" } 
    if (e.target.id === "todoList") { 
      const todoListItemToChange = e.target.value
      const currentValue = this.state.meetingInfo.todoList[todoListItemToChange]
      newValue = { ...this.state.meetingInfo.todoList, [todoListItemToChange] : !currentValue}
    }
    let newMeetingInfo = _.cloneDeep(this.state.meetingInfo)
    newMeetingInfo[infoToChange] = newValue
    this.setState({meetingInfo: newMeetingInfo})  
    // activation need to trigger a change to DB right away since there is no save button
    if (e.target.id === "chatActivation") { 
      console.log('triggering to send meeting changes to DB')
      this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, newMeetingInfo)
    }
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
    const changes =  this.state.meetingInfo
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

  // implemented quill from https://codesandbox.io/s/qv5m74l80w?file=/src/index.tsx:309-381
  changeInviteContents = (contents) => {
    let newMeetingInfo = _.cloneDeep(this.state.meetingInfo)
    let _contents = null;
    if (__ISMSIE__) {
      if (contents.indexOf("<p><br></p>") > -1) {
        _contents = contents.replace(/<p><br><\/p>/gi, "<p>&nbsp;</p>");
      }
    }
    newMeetingInfo.inviteText = _contents || contents
    this.setState({ meetingInfo: newMeetingInfo });
  };

  saveChangeInviteText = () => {
    // first check that the text contains all placeholders
    if (this.state.meetingInfo.inviteText.includes('$DATE$') && this.state.meetingInfo.inviteText.includes('$NAME$') 
        && this.state.meetingInfo.inviteText.includes('$DATE$') && this.state.meetingInfo.inviteText.includes('$CHATLENGTH$')
        && this.state.meetingInfo.inviteText.includes('$CHATPARTNER$')) {
          console.log('triggering to send meeting changes to DB')
          const changes =  this.state.meetingInfo
          this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
          this.setState({changeInvite: false})
    } else {
      toast.warning("Hmm, you are missing one of the placeholders: $NAME$, $DATE$, $DATE$, $CHATLENGTH$ or $CHATPARTNER$.", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
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
    const changes =  this.state.meetingInfo
    this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
    this.setState({changeTodoList: false})
  }


  openAddChatDialog = () => {
    const currentState = _.cloneDeep(this.state)
    this.setState({
      showChatDialog: true,
      initialState: currentState
    })
  }

  openEditChatDialog = () => {
    const currentState = _.cloneDeep(this.state)
    const newMeetingInfo = _.cloneDeep(this.state.meetingInfo)
    const selectedChatInfo = newMeetingInfo.chats[this.state.selectedChatTableId]
    this.setState({
      showEditChatDialog: true,
      showChatDialog: true,
      initialState: currentState,
      chatInfo: selectedChatInfo
    })
  }

  createChatHTML = () => {
    if (this.state.meetingInfo.chats.length === 0 ) {
      return <p> Please go ahead and add chat times</p>
    } else {
      let chatList = this.state.meetingInfo.chats
      chatList = chatList.sort((a, b) => (a.chatDate > b.chatDate) ? 1 : (a.chatDate === b.chatDate) ? ((a.chatTime > b.chatTime) ? 1 : -1) : -1 )
      const chatListHTML = chatList.map((item, index) => {
        if (item === this.state.selectedEmail[0]) {
          return null
        } else {
          return <div className='chatBox' tabIndex={index} id={item.id} key= {item.id} onClick={this.setSelectedChat}> 
                    <div className='p chatBoxTitle' id={item.id}>
                      Meeting {item.id }
                    </div>
                    <div className='p chatBoxTitle' id={item.id}>
                      {item.chatName}
                    </div>
                    <div className='p' id={item.id}>
                      On {item.chatDate}
                    </div>
                    <div className='p' id={item.id}>
                      at {item.chatTime}
                    </div>
                    <div className='p' id={item.id}>
                      for {item.chatLength} minutes
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

  saveChat = () => {
    const chatId = this.state.chatInfo.chatDate + '@' + this.state.chatInfo.chatTime
    const chatIdIndex = this.state.meetingInfo.chats.findIndex(data => data.id === chatId)
    // check if a chat at that time already exists by checking the chatId against existing chatIds
    if (chatIdIndex === -1 || this.state.chatInfo.chatLength !== this.state.meetingInfo.chats[this.state.selectedChatTableId].chatLength) {
      let newMeetingInfo = _.clone(this.state.meetingInfo)
      let newChatInfo = _.clone(this.state.chatInfo)
      newChatInfo.id = chatId
      // check if coming from edit or add chat, when coming from edit an Id should already exists
      if (this.state.chatInfo.id) {
        // delete selected one
        newMeetingInfo.chats.splice(this.state.selectedChatTableId,1)
        newMeetingInfo.chats.push(newChatInfo)
        const changes =  this.state.meetingInfo
        console.log('triggering to send meeting changes to DB')
        this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
        this.setState({
          meetingInfo: newMeetingInfo,
          showChatDialog: false,
          showEditChatDialog: false
        })
      } else {
          newMeetingInfo.chats.push(newChatInfo)
          const changes =  this.state.meetingInfo
          console.log('triggering to send meeting changes to DB')
          this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
          this.setState({
            meetingInfo: newMeetingInfo,
            showChatDialog: false
          })
      } 
    } else {
      toast.warning("Ooops, there is already a chat at this time.", {
        position: toast.POSITION.TOP_RIGHT
      })
    }  
  }

  openDeleteChatDialog = () => {
    this.setState({
      showDeleteDialog: true,
      showDeleteDialogChat: true
    })
  }

  deleteChat = () => {
    let newMeetingInfo = _.clone(this.state.meetingInfo)
    newMeetingInfo.chats.splice(this.state.selectedChatTableId,1)
    const changes =  this.state.meetingInfo
    console.log('triggering to send meeting changes to DB')
    this.editTableEntry('SocialButterflyChatsTable', this.props.userInfo.userSubId, changes)
    this.setState({
      meetingInfo: newMeetingInfo,
      showDeleteDialog: false,
      showDeleteDialogChat: false
    })
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
          {!this.state.isLoadingMeetingInfoList && this.state.meetingInfo.chatActivation ?
            <div className='accountStatus accountActivated'> Activated, move switch to stop sending invites out </div>
            :
            <div className='accountStatus accountDeactivated'>Not activated, move switch to start sending invites out</div>
          }
          {!this.state.isLoadingMeetingInfoList && 
            <FormControlLabel
              control={
                <PurpleSwitch size='medium' disableRipple id='chatActivation' 
                  checked={this.state.meetingInfo.chatActivation} onChange={this.setMeetingInfo} 
                  name="chatActivation" value={this.state.meetingInfo.chatActivation  ? 0 : 1}
                  classes={{switchBase: 'switchBase'}}
                />
              }
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
                    onUpdateSelectedEmail={this.updateSelectedEmail}
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
                        meetingInfo={this.state.meetingInfo}
                        onCancelChangeChat={this.cancelChange}
                        onOpenAddChatDialog= {this.openAddChatDialog}
                        showChatDialog={this.state.showChatDialog}
                        onCreateChatHTML={this.createChatHTML}
                        disableChatButtons={this.state.disableChatButtons}
                        selectedChatTableId={this.state.selectedChatTableId}
                        onOpenEditChatDialog={this.openEditChatDialog}
                        showEditChatDialog={this.state.showEditChatDialog}
                        chatInfo={this.state.chatInfo}
                        onSetChatInfo={this.setChatInfo}
                        onSaveChat= {this.saveChat}
                        onOpenDeleteChatDialog={this.openDeleteChatDialog}
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
                      onSetInviteText={this.changeInviteContents}
                      userInfo={this.props.userInfo}
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
        <Dialog open={this.state.showAddPeopleDialog} >
          <DialogTitle>Add Employeess</DialogTitle>
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
        <Dialog open={this.state.showEditEmployeeDialog} >
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
        <Dialog open={this.state.showEditPersonDialog} >
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
        <Dialog open={this.state.showDeleteDialog}>
          <DialogTitle>{"Confirm deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.showDeleteDialogChat ?
              'Do you really want to delete chat '  + this.state.meetingInfo.chats[this.state.selectedChatTableId].id + '?' :
              'Do you really want to delete '  + this.state.selectedEmail + '?'
            }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.state.showDeleteDialogChat ? this.deleteChat :this.deletePerson} className="actionButton">
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