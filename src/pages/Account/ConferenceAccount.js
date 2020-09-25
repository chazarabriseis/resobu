import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { withRouter } from "react-router";
import { ToastContainer } from 'react-toastify';

import 'react-tabs/style/react-tabs.css'
import './Account.css'
import '../../App.css'


class ConferenceAccount extends React.Component {

  render() {
    return (
      <div>
        <div className="topSection">
            <div className="heading1"> Your remote social butterfly conference chats</div>
        </div>
        <div className="sections"> 
            <div className="section1">
              <div className="sectionContent">
                  <Tabs style={{ width: '90%'}}>
                    <TabList>
                        <Tab> People List </Tab>
                        <Tab> Meeting Time </Tab>
                        <Tab> Meeting Invite </Tab>
                        <Tab> To Do List </Tab>
                    </TabList>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                  </Tabs>
              </div>
            </div>      
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default withRouter(ConferenceAccount);