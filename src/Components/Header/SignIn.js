import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'

library.add(fas)


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.forgotPasswordTrigger = this.forgotPasswordTrigger.bind(this);
        this.forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);
    
        this.state = {
          email: "",
          password: "",
          showPassword: false,
          code: "", 
          passwordConfirm: "",
          forgotPassword: false,
          enterNewPassword: false       
        }
      }

    componentDidMount () {
        window.scrollTo(0, 0);
        if (Boolean(this.props.goToEnterCode)) {
            this.setState({
                email: this.props.goToEnterCode
            })
            this.props.onSetGoToEnterCode(null)
        }
    }

    async signIn() {
        const username = (this.state.email).toLowerCase()
        const password = this.state.password
        if (!username.includes('@') || username.length < 1 || password.length < 8 ) {
            toast.error("Hmm, are all the input fields correct?", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            try {
                await Auth.signIn(username, password);
            } catch (error) {
                if (error.name === "NotAuthorizedException") {
                    toast.error("Oops, the password is not correct, please check the spelling and try again.", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                } 
                if (error.name === "UserNotFoundException") {
                        toast.error("Oops, no account exists for this email. Please check the spelling or sign up first", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                } 
                if (error.name === "UserNotConfirmedException") {
                        toast.error("You haven't confirmed your email address yet, the code to do so should be in your inbox.", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.props.onSetGoToEnterCode(this.state.email)  
                        this.props.history.push('/signup')
                }
                return
            }
            this.props.onSignIn(username, password)
            this.props.history.push('/account')
        }
    }

    handleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
    }

    forgotPassword = () => {
        this.setState({
            forgotPassword: true
        })
    }

    onSubmit = () => {
        if (!this.state.email.includes('@') || this.state.email.length < 1 || 
            (this.state.password !== this.state.passwordConfirm) || 
            this.state.password.length < 8
            ) {
                toast.error("Hmm, are all the input fields correct?", {
                    position: toast.POSITION.TOP_RIGHT
                  });
        } else {
            this.forgotPasswordSubmit()
        }
    }

    async forgotPasswordTrigger() {
        const username = (this.state.email).toLowerCase()
        try { 
            await Auth.forgotPassword(username)
        } catch (error) {
            if (error.name === "UserNotFoundException") {
                toast.error("Oops, there is no account for this email. Please check the spelling or sign up first.", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            return
        }
        this.setState({
            enterNewPassword: true,
            forgotPassword: false
        })
        toast.success("We just sent you a code so you can reset your password.", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    async forgotPasswordSubmit () {
        const username = (this.state.email).toLowerCase()
        const code = this.state.code
        const newPassword = this.state.password
        try {
            await Auth.forgotPasswordSubmit(username, code, newPassword)
        } catch (error ) {
            if (error.name === "CodeMismatchException") {
                toast.error("Hmmm, that code doesn't work. Please check the spelling and try again.", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
            return
        }
        toast.success("Yay, you just changed your password succesfully.", {
            position: toast.POSITION.TOP_RIGHT
        })
        this.setState({enterNewPassword: false})
    }

    render () {
        return (
            <div className="contact">
                <div className="flier"><img alt="appIcon" width="50" src="butterfly.png" /></div>
                {this.state.forgotPassword ? (
                    <div>
                        <div className="topSection">
                            <div className="heading1"> Reset password </div>
                        </div>
                        <div className="contactform">  
                            <div className="input"> 
                                <div className="inputDescription">Email Address</div>
                                <TextField 
                                    id="email" 
                                    size="small" 
                                    fullWidth
                                    required
                                    variant="outlined"  
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value })}
                                    error={!this.state.email.includes('@') || this.state.email.length < 1} 
                                    helperText={!this.state.email.includes('@') || this.state.email.length < 1 ? 'A valid email address is required' : ' '} 
                                />
                            </div>                   
                            <Button 
                                variant="contained"
                                className="actionButton"
                                onClick={this.forgotPasswordTrigger}
                                label="resetPassword"
                            >
                                Reset password 
                            </Button>  
                        </div>  
                    </div> 
                ) : (  
                this.state.enterNewPassword ? (
                    <div>
                        <div className="topSection">
                            <div className="heading1"> Reset password  </div>
                        </div>
                        <div className="contactform">  
                            <div className="input"> 
                                <div className="inputDescription">Email Address</div>
                                <TextField 
                                    id="email" 
                                    size="small" 
                                    fullWidth
                                    required
                                    variant="outlined"  
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value })}
                                    error={!this.state.email.includes('@') || this.state.email.length < 1} 
                                    helperText={!this.state.email.includes('@') || this.state.email.length < 1 ? 'A valid email address is required' : ' '} 
                                />
                            </div>
                            <div className="input">
                                <div className="inputDescription"> Confirmation Code  </div>   
                                <TextField 
                                    id="code" 
                                    size="small" 
                                    fullWidth   
                                    variant="outlined"  
                                    value={this.state.code}
                                    onChange={event => this.setState({code: event.target.value })}
                                    error={this.state.code.length < 1} 
                                    helperText={this.state.code.length < 1 ? 'You must enter a code' : ' '} 
                                />
                            </div>
                            <div className="input">
                                <div className="inputDescription"> New Password  </div>   
                                <TextField 
                                        id="password" 
                                        size="small" 
                                        fullWidth   
                                        variant="outlined"  
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={event => this.setState({password: event.target.value })}
                                        error={this.state.password.length < 8}
                                        helperText={this.state.password.length < 8 && 'Password needs to be at least 8 characters long'} 
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleShowPassword}
                                                    >
                                                    {this.state.showPassword ? <FontAwesomeIcon icon='eye'/>: <FontAwesomeIcon icon='eye-slash'/>}
                                                </IconButton>
                                            </InputAdornment>,
                                        }}
                                />
                            </div>
                            <div className="input">
                                <div className="inputDescription"> Confirm Password  </div>   
                                <TextField 
                                    id="passwordConfirm" 
                                    size="small" 
                                    fullWidth   
                                    variant="outlined"  
                                    value={this.state.passwordConfirm}
                                    onChange={event => this.setState({ passwordConfirm: event.target.value })}
                                    error={this.state.passwordConfirm !== this.state.password}
                                    helperText={this.state.passwordConfirm !== this.state.password && 'Passwords must match'} 
                                    type={this.state.showPassword ? 'text' : 'password'}
                                />
                            </div>
                            <Button 
                                variant="contained"
                                className="actionButton"
                                onClick={this.onSubmit}
                                label="forgotPasswordSubmit"
                            >
                                Submit new Password 
                            </Button>  
                        </div>  
                    </div>
                ) : (
                    <div>
                        <div className="topSection">
                            <div className="heading1"> Sign in to your account </div>
                        </div>
                        <div className="contactform">  
                            <div className="input"> 
                                <div className="inputDescription">Email Address</div>
                                <TextField 
                                    id="email" 
                                    size="small" 
                                    fullWidth
                                    required
                                    variant="outlined"  
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value })}
                                    error={!this.state.email.includes('@') || this.state.email.length < 1} 
                                    helperText={!this.state.email.includes('@') || this.state.email.length < 1 ? 'A valid email address is required' : ' '} 
                                />
                            </div>
                            <div className="input">
                                <div className="inputDescription"> Password  </div>   
                                <TextField 
                                        id="password" 
                                        size="small" 
                                        fullWidth   
                                        variant="outlined"  
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={event => this.setState({password: event.target.value })}
                                        error={this.state.password.length < 8}
                                        helperText={this.state.password.length < 8 && 'Password needs to be at least 8 character long'} 
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleShowPassword}
                                                    >
                                                    {this.state.showPassword ? <FontAwesomeIcon icon='eye'/>: <FontAwesomeIcon icon='eye-slash'/>}
                                                </IconButton>
                                            </InputAdornment>,
                                        }}
                                    />
                                </div>
                            <div className="container">
                                <Button 
                                    variant="contained"
                                    className="actionButton"
                                    onClick={this.signIn}
                                    label="signIn"
                                >
                                    Sign In 
                                </Button>  
                                <Button 
                                    variant="contained"
                                    className="ghostButton"
                                    onClick={this.forgotPassword}
                                    label="signIn"
                                >
                                    Forgot Password 
                                </Button>  
                            </div>
                        </div>  
                    </div>
                ))}   
            <ToastContainer />
        </div>
        )
    }
}

export default withRouter(SignIn);
