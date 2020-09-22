
import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import Account from './pages/Account/Account'
import Home from './pages/Home/Home'
import HomeBusiness from './pages/Home/HomeBusiness'
import HomeConference from './pages/Home/HomeConference'
import HomeTradeshow from './pages/Home/HomeTradeshow'
import AboutUs from './pages/AboutUs/AboutUs'
import Contact from './pages/Contact/Contact'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import SignUp from './Components/Header/SignUp'
import SignIn from './Components/Header/SignIn'
import "./App.css";
import '@aws-amplify/ui/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

import Amplify,  { Auth }  from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

    this.state = {
      isAuthenticated: false,
      userInfo: {},
      goToEnterCode: null,
      groupType: '-',
      subscription: '-'
    }
  }

  async signIn(username, userSubId, groupType, subscription) {
    this.setState({ 
      userInfo: {email: username, userSubId: userSubId, groupType: groupType, subscription: subscription},
      isAuthenticated: true
    })
  }
  
  async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        toast.error("Problem signing you out.", {
          position: toast.POSITION.TOP_RIGHT
        });
        return
    }
    this.setState({ 
      userInfo: {},
      isAuthenticated: false
    })
  }

  setGoToEnterCode = (value) => {
    this.setState({goToEnterCode: value})
  }

  setGroupType = (value) => {
    this.setState({groupType: value})
  }

  setSubscription = (value) => {
    this.setState({subscription: value})
  }

  render () {
    return (
      <div>
        <Router>
          <div className="app">
            <div className="screen">
              <Header
                onSignOut={this.signOut}
                isAuthenticated={this.state.isAuthenticated}
                userInfo={this.state.userInfo}
              />
              <Switch>
                <Route exact path="/" > 
                  <Home/>
                </Route>
                <Route exact path="/business" > 
                  <HomeBusiness
                    onsetGroupType = {this.setGroupType}
                    onSetSubscription = {this.setSubscription}
                  />
                </Route>
                <Route exact path="/conference" > 
                  <HomeConference
                   onsetGroupType = {this.setGroupType}
                   onSetSubscription = {this.setSubscription}
                  />
                </Route>
                <Route exact path="/tradeshow" > 
                  <HomeTradeshow
                    onsetGroupType = {this.setGroupType}
                    onSetSubscription = {this.setSubscription}
                  />
                </Route>
                <Route exact path="/aboutus" > 
                  <AboutUs/>
                </Route>
                <Route exact path="/signup" > 
                  <SignUp
                    goToEnterCode = {this.state.goToEnterCode}
                    onSetGoToEnterCode = {this.setGoToEnterCode}
                    groupType = {this.state.groupType}
                    subscription = {this.state.subscription}
                  />
                </Route>
                <Route exact path="/signin" > 
                  <SignIn
                    onSignIn={this.signIn}
                    goToEnterCode = {this.state.goToEnterCode}
                    onSetGoToEnterCode = {this.setGoToEnterCode}
                  />
                </Route>
                <Route exact path="/contact" > 
                  <Contact
                    isAuthenticated={this.state.isAuthenticated}
                    userInfo={this.state.userInfo}
                  />
                </Route>
                <Route exact path="/account" >
                  <Account    
                    userInfo={this.state.userInfo}
                    isAuthenticated={this.state.isAuthenticated}
                    onSignIn={this.signIn}
                  />
                </Route>
              </Switch>
              <Footer/>
            </div>
          </div>
        </Router>
        <ToastContainer />
      </div>
    )
  } 
}

export default App;