import React from 'react'
import { withRouter } from "react-router";
import './AboutUs.css'
import '../../App.css'


class AboutUs extends React.Component {

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> The Team</div>
          <div className="heading2">More information coming soon</div>
        </div>
        <div className="contactContent"></div>
      </div>
    )
  }
}

export default withRouter(AboutUs);
