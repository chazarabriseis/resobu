import React from 'react'
import './Home.css'

class Why extends React.Component {

  render () {
    return(
      <div className="container whyContent">
        <div className="whyImage"> 
          <img alt="github" className='imgBw imgWhy' src="watercooler.jpg" />
        </div>
        <div className="whyText">
          <div style={{marginBottom: '10px'}}>
          Times are changing, more and more people are working from home or in different office locations. 
          Therfore no more unplanned watercooler discussions happen which are known to lead to connections and new ideas.
          </div>
          <div style={{marginBottom: '10px'}}>
          The same applies to conferences and tradeshows, in the modern times these will be carried out more often in the digital world.
          Therfore people cannot mingle anymore in the breaks and in front of exhibition booths to exchange knowledge and build networks,
          a major reason why to attend them.
          </div>
          <div>
          Remote Social Butterfly makes sure that people stay connected in the digital world by
          organizing chance or tailored encounters, creating room for communication.
          </div>              
        </div>
        <div className="whyImage"> 
          <img alt="github" className='imgWhy' src="homeoffice.jpeg" />
        </div>
      </div>
    )
  }
}

export default Why;
