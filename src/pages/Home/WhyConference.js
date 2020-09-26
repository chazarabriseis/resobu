import React from 'react'
import './WhyDetails.css'
import '../../App.css'


class WhyConference extends React.Component {
    constructor(props) {
        super(props);

        this.whySteps = [
          {
            label: 'From Connections Emerge Networks',
            imgPath:
            'caterpillar_transformation.png',
            text: 'A key place for creating connections are conferences. However, through digitalization and global pandemics, the opportunity to come together to meet in person and build networks are reducing. Even at a life conferences the amount of people one could meet is overwheleming and it takes energy and courage to organize meetings with new people, so a lot times they do not happen. Remote Social Butterfly provides the opportunity to connect with attendees and create chance or deliberate encounters to grow everyones network.'
            },
          {
            label: 'From Networks Emerge Possibilities',
            imgPath:
              'butterfly_transformation.png',
            text: 'The importance of a strong network is almost universal across all businesses. But how do networks form, it is through connections. Connections that grow and evolve over time to create individual networks across industries, sectors and the world. It is through building a strong network of business partners, suppliers, clients, potential employees or employers and academia allowing people and businesses to grow and to be successful.'
          }
        ]
      }

  render () {
    return (
    <div>
      <div className='heading3 planContainer'>We belive that these chats lead to new connections and networks, essential for sucessful people and businesses </div>
        <div className='container planContainer planInfo'>
          {this.whySteps.map((step) => {
            return <div key={step.label} className='plan planTitle'><div className='whyLabel'>{step.label}</div></div>
          })}
        </div>
        <div className='container'>
          {this.whySteps.map((step) => {
            return <div key={step.imgPath} className='plan planTitle'><img className='img imgBw' src={step.imgPath} alt={step.label} /></div>
          })}
        </div>
        <div className='container'>
          {this.whySteps.map((step) => {
            return <div key={step.text} className='plan planTitle'><div className='whyText'>{step.text}</div></div>
          })}
        </div>
    </div>
    )
  }
}

export default WhyConference;

// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-left'/>  : <FontAwesomeIcon icon='chevron-right'/>}
// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-right'/>: <FontAwesomeIcon icon='chevron-left'/>}
         