import React from 'react'
import { TextField, Button, FormControl, Select, FormHelperText} from '@material-ui/core'
import { withRouter } from "react-router";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Auth } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { subscriptionBusiness, subscriptionConference, subscriptionTradeshow, groupTypes } from '../Common/Variables'
import '../../App.css'

library.add(fas)


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.resendConfirmationCode = this.resendConfirmationCode.bind(this);
    
        this.state = {
          submitted: false,
          email: "",
          groupType: "-",
          subscription: "-",
          password: "",
          passwordConfirm: "",
          showPassword: false,
          code: "",
          codeAlreadySent: false          
        }
      }
    
    componentDidMount() {
        if (Boolean(this.props.goToEnterCode)) {
            this.setState({
                submitted: true,
                codeAlreadySent: true,
                email: this.props.goToEnterCode
            })
            this.props.onSetGoToEnterCode(null)
        }
        // these props will be set when coming from a button from the subscription offers and prefilled
        this.setState({
            groupType: this.props.groupType,
            subscription: this.props.subscription
        })
    }  

    gotoCode = () => {
        this.setState({
            submitted: true
        })
    }

    onSubmit = () => {
        if (!this.state.email.includes('@') || this.state.email.length < 1 || 
            (this.state.password !== this.state.passwordConfirm) || 
            this.state.password.length < 8
            ) {
                toast.error("Hmm, are all the input fields correct?", {
                    position: toast.POSITION.TOP_RIGHT
                })
        } else {
            this.setState({
                submitted: true
            })
            this.signUp()
        }
    }

    setSubscription = (e) => {
        this.setState({subscription: e.target.value})  
    }

    setGroupType = (e) => {
        this.setState({groupType: e.target.value})  
    }

    async signUp() {
        const username = (this.state.email).toLowerCase()
        const email = (this.state.email).toLowerCase()
        const password = this.state.password
        const subscription = this.state.groupType+this.state.subscription
        const groupType = this.state.groupType
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    'custom:subscription' : subscription,
                    'custom:groupType': groupType
                }
            })
        } catch (error) {
            if (error.name === "UsernameExistsException") {
                toast.error("Oops, it seems like you have already signed up.", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.setState({
                    codeAlreadySent: true
                })
            } else {
                toast.error("Hmm, there was a problem with the sign up.", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            return
        }
        toast.success("Yay, your account was succesfully created. You just need to confirm your email by entering the code we just sent you.", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    async confirmSignUp() {
        const username = (this.state.email).toLowerCase()
        const code = this.state.code
        if (this.state.code.length < 1 ||
            !this.state.email.includes('@') || this.state.email.length < 1) {
                toast.error("Hmm, are all the input fields correct?", {
                    position: toast.POSITION.TOP_RIGHT
                })
        } else {
            try {
                await Auth.confirmSignUp(username, code);
            } catch (error) {
                if (error.name === "CodeMismatchException") {
                    toast.error("Oops, this code does not work. Please check the spelling and try again.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else if (error.name === "ExpiredCodeException") {
                    toast.error("Oops, this code expired. Please request a new one.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.setState({codeAlreadySent: true})
                } else {
                    toast.error("Hmm, there is a problem signing you up.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                return
            }
        }
        toast.success("Yay, your account was successfully confirmed, please go ahead and sign in.", {
            position: toast.POSITION.TOP_RIGHT
        })
        this.props.onSetGoToEnterCode(this.state.email)
        this.props.history.push('/signin')
    }

    async resendConfirmationCode() {
        const username = (this.state.email).toLowerCase()
        try {
            await Auth.resendSignUp(username);
        } catch (err) {
            toast.error("Hmm, the code could not be resent.", {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        toast.success("Yay, a new code has been sent to your email.", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    handleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
    }

    render () {
        return (
            <div className="contact">
                <div className="flier"><img alt="appIcon" width="50" src="butterfly.png" /></div>
                <div className="topSection">
                    <div className="heading1"> Create a new account </div>
                </div>
                { this.state.submitted ? (
                    <div>   
                        {this.state.codeAlreadySent ? 
                            <div className="buttonExplantion"> 
                                You already signed up, if you have not confirmed the email address yet please go ahead now, the code should be in your inbox. 
                                If you already did that, just <div onClick={function(){this.props.history.push('/signin')}.bind(this)} style={{fontWeight:"bold", display: "inline", cursor: "pointer"}}>Sign Up </div> or <div onClick={function(){this.props.history.push('/signin')}.bind(this)} style={{fontWeight:"bold", display: "inline", cursor: "pointer"}}>reset your password</div>.
                            </div>
                            : 
                            <div className="buttonExplantion"> 
                                Check your inbox to get the confirmation code.
                            </div>
                        }
                        <div className="input">
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
                            <TextField 
                                id="code" 
                                size="small" 
                                label='Enter confirmation code here'
                                fullWidth   
                                variant="outlined"  
                                value={this.state.code}
                                onChange={event => this.setState({code: event.target.value })}
                                error={this.state.code.length < 1} 
                                helperText={this.state.code.length < 1 ? 'You must enter a code' : ' '} 
                            />
                            </div>
                            <Button 
                                variant="contained"
                                className="actionButton"
                                onClick={this.confirmSignUp}
                                label="submit"
                            >
                                Send code
                            </Button>  
                            {this.state.codeAlreadySent ?
                                <div>
                                    <div className='buttonExplantion'>
                                        Can't find the code or signed up more than one week ago?
                                    </div>
                                    <Button 
                                        variant="contained"
                                        className="ghostButton"
                                        onClick={this.resendConfirmationCode}
                                        label="submit"
                                    >
                                        Resend code
                                    </Button> 
                                </div>:
                                <div></div>
                            }
                        </div>  
                ) : (
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
                            <div className="inputDescription">Where do you want to connect people</div>
                            <FormControl variant="outlined" error ={this.state.groupType=== "-"} >
                                <Select
                                    native
                                    value={this.state.groupType}
                                    onChange={this.setGroupType}
                                    id='groupType'
                                >
                                {groupTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                                </Select>
                                {this.state.groupType=== "-" && <FormHelperText>You need to choose an option</FormHelperText>}
                            </FormControl>
                        </div>
                        <div className="input"> 
                            <div className="inputDescription">Subscription</div>
                            <FormControl variant="outlined" error ={this.state.subscription=== "-"}>
                                <Select
                                    native
                                    value={this.state.subscription}
                                    onChange={this.setSubscription}
                                    id='subscription'
                                >
                                { this.state.groupType === 'Business' ? (
                                        subscriptionBusiness.map((item) => <option key={item} value={item}>{item}</option>)
                                    ) : ( this.state.groupType === 'Conference' ? (
                                        subscriptionConference.map((item) => <option key={item} value={item}>{item}</option>)
                                    ) : (this.state.groupType === 'Tradeshow' ? (
                                        subscriptionTradeshow.map((item) => <option key={item} value={item}>{item}</option>)
                                    ) : (<option key='-' value='-'>-</option>)
                                    ))
                                }
                                </Select>
                                {this.state.subscription=== "-" && <FormHelperText>You need to choose a subscription option</FormHelperText>}
                            </FormControl>
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
                                    startAdornment: <InputAdornment position="end">
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
                        <div>
                            <Button 
                                variant="contained"
                                className="actionButton"
                                onClick={this.onSubmit}
                                label="submit"
                            >
                                Sign Up 
                            </Button> 
                            <Button 
                                variant="contained"
                                className="ghostButton"
                                onClick={this.gotoCode}
                                label="submitcode"
                            >
                                Confirm Email 
                            </Button> 
                        </div> 
                    </div>     
                )}
            <ToastContainer />
        </div>
        )
    }
}

export default withRouter(SignUp);
