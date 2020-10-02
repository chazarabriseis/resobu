import React from 'react'
import './WhyDetails.css'
import '../../App.css'


class WhyBusiness extends React.Component {
    constructor(props) {
        super(props);

        this.whySteps = [
          {
            label: 'From Communication Emerges Connection',
            imgPath:
              'caterpillar_transformation.png',
            text: 'While online platforms have got the formal chat in the digital age organised, the informal conversations are lost. The remote social butterfly acts to stimulate the informal communication culture in organisation or at conferences. By doing the work behind the scenes to recreate those chance encounters that support formation of strong networks. Remote Social Butterfly connects people either on a random or data-driven basis. Remote Social Butterfly helps to replace those chance encounters before and after meetings, in the hallways and at the water cooler, by arranging short chats in the calendar between two or more people.'
          },
          {
            label: 'From Connection Emerges Collaboration',
            imgPath:
              'pupa_transformation.png',
            text: ' Successful organizations around the world understand the value of collaboration. It brings cohesive teams, improved performance, efficient solutions, satisfied clients and innovation. Communication is the cornerstone to effective collaboration. Teams and groups that can communicate openly, purposefully and effectively will create the environment in which collaboration can thrive. The digital era, working from home and global pandemics are transforming and disrupting the way communication in organisations and at conference functions. Maintaining effective integrated communication is key to fostering and maintaining a collaborative environment.'
          },
          {
            label: 'From Collaboration Emerges Innovation',
            imgPath:
              'butterfly_transformation.png',
            text: 'The right conditions for innovation to occur are varied, but one place it definitely won’t occur is where the right people are not communicating. The overwhelming majority of successful innovation stories come from teams. Teams that work not just within departments but across departments to understand the full picture from marketing to finance, from research to production, from legal to post sales supports. The ability to engage in a collaborative environment across the business improves the likelihood that successful innovation and performance will follow. Conversely, studies have shown, the incidence of communication drops sharply within an organisation, even with increased distance between departments and across multiple building levels. Imagine how it suffers in the time of working from home. Introducing Remote Social Butterfly chats will reintroduce those encounters.'
          }
        ]
      }

  render () {
    return (
    <div>
      <div className='heading3 planContainer'>We belive that these chats lead to communication and new connections which will ultimatley result in success and innovation</div>
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
            return <div  key={step.text} className='plan planTitle'><div className='whyText'>{step.text}</div></div>
          })}
        </div>
    </div>
    )
  }
}

export default WhyBusiness;

// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-left'/>  : <FontAwesomeIcon icon='chevron-right'/>}
// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-right'/>: <FontAwesomeIcon icon='chevron-left'/>}
         