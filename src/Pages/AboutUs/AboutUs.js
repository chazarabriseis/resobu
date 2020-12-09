import React from 'react'
import { withRouter } from "react-router";
import './AboutUs.css'
import '../../App.css'


class AboutUs extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div>
        <div className="topSection">
          <div className="heading1"> The Team</div>
          <div className="heading2">We believe that communication is the key to healthy organization culture and networks which in turn is the key to innovation and success.</div>
        </div>
        <div className="contactContent">
          <img alt="howIcon" className= "team-image" src="ReSoBuTeam.png" />
        </div>
      </div>
    )
  }
}

export default withRouter(AboutUs);
