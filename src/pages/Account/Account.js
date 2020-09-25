import React from 'react'
import { withRouter } from "react-router";
import { Auth} from 'aws-amplify';

import BusinessAccount from './BusinessAccount';
import ConferenceAccount from './ConferenceAccount';
import TradeshowAccount from './TradeshowAccount';
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
      const subscription = userInfoAll.attributes['custom:subscription']
      const groupType = userInfoAll.attributes['custom:groupType']
      await this.props.onSignIn(username, userSubId, groupType, subscription)
      this.waitingDone()
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
              <div>
                {this.props.userInfo.groupType === 'Business' ? (
                  <BusinessAccount 
                    userInfo={this.props.userInfo}
                  />
                ) : (
                  <div>
                    {this.props.userInfo.groupType === 'Conference' ? (
                      <ConferenceAccount 
                        userInfo={this.props.userInfo}
                      />
                    ) : (
                      <div>
                        {this.props.userInfo.groupType === 'Tradeshow' ? (
                          <TradeshowAccount 
                            userInfo={this.props.userInfo}
                          />
                        ) : (
                          <TradeshowAccount 
                            userInfo={this.props.userInfo}
                          />
                        )
                      }
                      </div> 
                    )}
                  </div>
                )}
              </div>
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