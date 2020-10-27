import React from 'react'
import { withRouter } from "react-router";
import { Auth} from 'aws-amplify';

import AllAccounts from './AllAccounts';
import Spinner from '../../Components/Common/Spinner'


class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: true
    }
  }

  async componentDidMount () {
    const userInfoAll = await Auth.currentUserInfo();
    if (userInfoAll) {
      const username = userInfoAll.attributes.email
      const userSubId = userInfoAll.attributes.sub
      const groupType = userInfoAll.attributes['custom:groupType']
      const subscription = userInfoAll.attributes['custom:subscription']
      const accountName = userInfoAll.attributes['custom:accountName']
      const userType = userInfoAll.attributes['custom:userType']
      await this.props.onSignIn(username, userSubId, groupType, subscription, accountName, userType)
      this.waitingDone()
      window.scrollTo(0, 0);
    } 
  }

  waitingDone = () => {
    this.setState({waiting: false})
  }


  render() {
    return (
      <div>
      {this.state.waiting ? ( 
        <Spinner />
        ) : (
          <div>
            {this.props.isAuthenticated ? (
              <AllAccounts 
                userInfo={this.props.userInfo}
              />               
            ) : (
              <div style={{marginBottom: '500px'}}>
                <div className="topSection">
                  <div className="heading1"> You need to sign in to access this page</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Account);