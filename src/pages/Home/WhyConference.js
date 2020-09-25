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
            text: 'A key place for creating connections is tradeshows and conferences. Through digitalisation and global pandemics, the opportunity to come together to meet in person and build networks are reducing. But that should not mean that the possibility to attend conferences or tradeshow to meet new connections is lost. Remote Social Butterfly provides the opportunity to reconnect with attendees and create the kind of chance or deliberate encounters experienced at trade shows and conferences to create new connections.'
            },
          {
            label: 'From Networks Emerge Possibilities',
            imgPath:
              'butterfly_transformation.png',
            text: 'The importance of a strong network is almost universal across all businesses. But how do networks form, it is through connections. Connections that grow and evolve over time to create individual networks across industries, sectors and the world. It is through building a strong network of business partners, suppliers, clients, potential employees or employers and academia that we can build that type of networks that we need to support endless possibilities.'
          }
        ]
      }

  render () {
    return (
    <div>
      <div className='heading3 planContainer'>We belive that these chats lead to communication and new connections which will ultimatley result in success and innovation</div>
        <div className='container planContainer planInfo'>
          {this.whySteps.map((step) => {
            return <div className='plan planTitle'><div className='whyLabel'>{step.label}</div></div>
          })}
        </div>
        <div className='container'>
          {this.whySteps.map((step) => {
            return <div className='plan planTitle'><img className='img imgBw' src={step.imgPath} alt={step.label} /></div>
          })}
        </div>
        <div className='container'>
          {this.whySteps.map((step) => {
            return <div className='plan planTitle'><div className='whyText'>{step.text}</div></div>
          })}
        </div>
    </div>
    )
  }
}

export default WhyConference;

// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-left'/>  : <FontAwesomeIcon icon='chevron-right'/>}
// {this.theme.direction === 'rtl' ? <FontAwesomeIcon icon='chevron-right'/>: <FontAwesomeIcon icon='chevron-left'/>}
         