import React from 'react'
import '../../Pages/Home/Home.css'

class How extends React.Component {

  render () {
    return(
      <div>
        <div className='heading3'>We organise these encounters either randomly or tailor them with your data and our connection and learning <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance</div>
        <div className='container'>
          <div className='card'>
            <div className='cardTitle'>Random selection of chat partners</div>
            <img className='cardImage imgBw' src='random.png' alt='random' />
            <div className='cardText'> 
              From all people random chat partners will be choosen no matter if they already work together or not. 
              We will make sure that the same people are not meeting again before they have met most of the others. 
            </div>
          </div>
          <div className='card'>
            <div className='cardTitle'>Data-driven selection of chat partners</div>
            <img className='cardImage imgBw' src='tailored.png' alt='tailored' />
            <div className='cardText'>
              <div>
                <div className='cardTitle2'>Connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance</div>
                <div className='cardText'> 
                  <div style={{fontWeight: '500', display: 'inline'}}>For Businesses: </div> Feeding the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance with data, chats can be organised more purposefully.
                  For example, we can make sure that team and project colleagues don't meet since they are already in contact. 
                  Or if exiting communication problems between departements are known, the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can target specific encounters.
                  You can also just plug in your Teams, Trello etc and the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance will learn from the metadata which connections already exists or where they are lacking.
                  Possibilities are endless, the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can be tailored exaxtly to your needs.
                </div>
                <div className='cardText'> 
                  <div style={{fontWeight: '500' , display: 'inline'}}>For Conferences and Tradeshows: </div> When additional data exists the connection <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance can work to develop encounters between attendees at conferences or 
                  tradeshows based on areas of expertise, locations, business areas and other relevant data to make sure the meetings organised are as meaningful and as beneficial as possible. 
                  It will avoid organising meetings that do not make sense, such as meetings between people who work at the same company or for competitors.
                </div>
              </div>
              <div>
                <div className='cardTitle2' style={{marginTop: '20px'}}>Learning <div style={{display: 'inline', fontWeight: 'bold'}}>AI</div>ssitance</div>
                <div className='cardText'>
                  <div style={{fontWeight: '500', display: 'inline'}}>For Businesses:</div> The Learning <div style={{display: 'inline', fontWeight: '500'}}>AI</div>ssitance collects feedback from the chats. It will also scrawl through metadata to see who is staying in touch or
                  driving more encounters. Innovation champions in a company are known to be most effective when they are self selected and emerge naturally, the Learning <div style={{display: 'inline', fontWeight: 'bold'}}>AI</div>ssitance
                  helps to indentify them and enables them to establish the networks they need to thrive and drive innovation.
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
