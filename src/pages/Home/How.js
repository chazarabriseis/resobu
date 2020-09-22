import React from 'react'
import './Home.css'

class How extends React.Component {

  render () {
    return(
      <div>
        <div className='heading3'>We organise these chats either randomly or tailor them with your data and our connection and learning <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance</div>
        <div className='container'>
          <div className='card'>
            <div className='cardTitle'>Random selection of chat partners</div>
            <img className='cardImage' src='random.png' alt='random' />
            <div className='cardText'> 
              From all people random chat partners will be choosen no matter if they already work together or not. 
              We will make sure that the same people are not meeting again before they have met most of the others. 
            </div>
          </div>
          <div className='card'>
            <div className='cardTitle'>Data-driven selection of chat partners</div>
            <img className='cardImage' src='tailored.png' alt='tailored' />
            <div className='cardText'>
              <div>
                <div className='cardTitle2'>Connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance</div>
                <div className='cardText'> 
                  Feeding the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance with data chats can be organised more carefully.
                  For example we can make sure that team colleagues and project colleagues don't meet since they are already in contact. 
                  If you see communication problems between RnD and marketing just let the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance know.
                  You can jsut plug in your Teams, Trello etc and the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can learn from the metadat who is already in contact.
                </div>
              </div>
              <div>
                <div className='cardTitle2' style={{marginTop: '20px'}}>Learning <div style={{display: 'inline', fontWeight: 'bold'}}>AI</div>ssitance</div>
                <div className='cardText'>
                  The Learning <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance collects feedback from the chats and follows up on metdata who is staying in touch, 
                  who is driving more encounters. There will be always innovation champions in a company, the learning Learning <div style={{display: 'inline', fontWeight: 'bold'}}>AI</div>ssitance
                  makes sure to give them room to grow and to get the exposure they need to drive innovation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default How;
