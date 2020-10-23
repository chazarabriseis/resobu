import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { withRouter } from "react-router";
import { API } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './Contact.css'
import '../../App.css'


class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      name: "",
      email: "",
      subject: "",
      text: "",
      showAlert: false
    }
  }
  
  componentDidMount () {
    window.scrollTo(0, 0);
    this.setState({submitted: false});
    if (this.props.isAuthenticated) { 
      this.setState({email : this.props.userInfo.email})
    }
  }

  onSubmit = () => {
    if (this.state.name.length > 20 || !this.state.email.includes('@') || this.state.email.length < 1 || 
        this.state.subject.length > 20 || this.state.text.length > 1000 || this.state.text.length < 1
        ) {
      this.setState({
        showAlert: true
      })
    } else {
      this.triggerEmail()
    }
  }

  onShowAlert = () => {
    this.setState({
      showAlert: true
    })
  };

  onCloseAlert = () => {
    this.setState({
      showAlert: false
    })
  };

  triggerEmail = () => {
    const _body = {}
    // send the information to the lambda function that sends an email
    console.log(this.state)
    API.post('ReSoBuAPI', '/sending-contact-email ', {
      body: _body
    })
    .then(response => {
      console.log(response)
      // const resultList = response['Items']
      // this.setState({peopleList: resultList})
      this.setState({
        submitted: true
      })
    }) 
    .catch(e => {
      toast.warning("Sorry, there was a problem connecting to the DB.", {
          position: toast.POSITION.TOP_RIGHT
      })
    }) 
  }

  render () {
    return (
      <div className="contact">
        <div className="topSection">
          <div className="heading1"> Contact us</div>
          <div className="heading2">Send us your questions and feedback.</div>
        </div>
        { this.state.submitted ? (
          <div className="submitMessage">
            Thanks for getting in touch! We will get back to you as soon as possible.
          </div>  
        ) 
        : (
          <div className="contactform">  
            <div className="input"> 
              <div className="inputDescription">Name </div>
              <TextField 
                id="name" 
                size="small" 
                fullWidth   
                label="Enter name here"
                variant="outlined"  
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
                error={this.state.name.length > 20}
                helperText={this.state.name.length > 20 ? 'name cannot be longer than 20 characters' : ' '} 
              />
              
            </div>
            <div className="input"> 
              <div className="inputDescription">Email Address</div>
              <TextField 
                id="email" 
                size="small" 
                fullWidth   
                label={this.props.isAuthenticated ? "" : "Enter email address here"}
                required
                variant="outlined"  
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                error={!this.state.email.includes('@') || this.state.email.length < 1} 
                helperText={!this.state.email.includes('@') || this.state.email.length < 1 ? 'A valid email address is required' : ' '} 
              />
            </div>
            <div className="input">
              <div className="inputDescription"> Subject  </div>   
              <TextField 
                id="subject" 
                size="small" 
                fullWidth   
                label="Enter subject here"
                variant="outlined"  
                value={this.state.subject}
                onChange={event => this.setState({ subject: event.target.value })}
                error={this.state.subject.length > 20}
                helperText={this.state.subject.length > 20 ? 'Subject cannot be longer than 20 characters' : ' '} 
              />
            </div>
            <div className="input">
              <div className="inputDescription">What would you like to contact us about? </div> 
              <TextField 
                id="text" 
                multiline 
                fullWidth 
                required
                rows={10} 
                label="Describe your question, feedback or problem." 
                variant="outlined"
                value={this.state.text}
                onChange={event => this.setState({ text: event.target.value })}
                error={this.state.text.length > 1000 || this.state.text.length < 1}
                helperText={this.state.text.length > 1000 ? 'Text cannot be longer than 1000 characters' : this.state.text.length < 1 ? 'Text field is required' : ''} 
              />
            </div>
            <Button 
              className="actionButton"
              onClick={this.onSubmit}
              label="submit"
            >
              Submit 
            </Button>  
          </div>     
        )}
        <Dialog
          open={this.state.showAlert}
          onClose={this.onCloseAlert}
        >
          <DialogTitle>{"Check your input"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Before you can submit make sure none of the input fields show an error.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseAlert} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </div>
    )
  }
}

export default withRouter(Contact);
