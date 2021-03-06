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
import { subscriptionOrganization, subscriptionEvent, groupTypes, userTypes } from '../Common/Variables'
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
          accountName: "",
          userType: "-",
          password: "",
          passwordConfirm: "",
          showPassword: false,
          code: "",
          codeAlreadySent: false          
        }
      }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        // checking if person  need to enter confirmatio code instead of new sign up
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
        this.setState({submitted: true})
    }

    onSubmit = () => {
        if (!this.state.email.includes('@') || this.state.email.length < 1 || 
            (this.state.password !== this.state.passwordConfirm) || 
            this.state.password.length < 8 || this.state.accountName.length < 1 ||
            this.state.subscription=== "-" || this.state.groupType=== "-" || this.state.userType=== "-" 
            ) {
                toast.error("Hmm, are all the input fields correct?", {
                    position: toast.POSITION.TOP_RIGHT
                })
        } else {
            this.signUp()
        }
    }

    setSignUpInput = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    async signUp() {
        const username = (this.state.email).toLowerCase()
        const email = (this.state.email).toLowerCase()
        const password = this.state.password
        const subscription = this.state.groupType+this.state.subscription
        const groupType = this.state.groupType
        const userType = this.state.userType
        const accountName = this.state.accountName
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    'custom:subscription' : subscription,
                    'custom:groupType': groupType,
                    'custom:accountName': accountName,
                    'custom:userType': userType
                }
            })
        } catch (error) {
            if (error.name === "UsernameExistsException") {
                toast.error("Oops, it seems like you have already signed up.", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.setState({
                    codeAlreadySent: true,
                    submitted: true
                })
            } else if (error.name === "InvalidParameterException") {
                toast.error("Oops, invalid email address format.", {
                    position: toast.POSITION.TOP_RIGHT
                })
            } else {
                toast.error("Hmm, there was a problem with the sign up.", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            return
        }
        this.setState({ submitted: true})
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
            <div>
                <div className="flier"><img alt="appIcon" width="50" src="butterfly-animated_purple.gif" /></div>
                <div className="topSection">
                    <div className="heading1"> Create a new account </div>
                </div>
                { this.state.submitted ? (
                    <div>   
                        {this.state.codeAlreadySent ? 
                            <div className="inputform"> 
                                You already signed up, if you have not confirmed the email address yet please go ahead now, the code should be in your inbox. 
                                If you already did that, just <div onClick={function(){this.props.history.push('/signin')}.bind(this)} style={{fontWeight:"bold", display: "inline", cursor: "pointer"}}>Sign Up </div> or <div onClick={function(){this.props.history.push('/signin')}.bind(this)} style={{fontWeight:"bold", display: "inline", cursor: "pointer"}}>reset your password</div>.
                            </div>
                            : 
                            <div className="inputform"> 
                                Check your inbox to get the confirmation code.
                            </div>
                        }
                        <div className="contentSection">
                            <div className="inputform">
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
                            </div> 
                        </div>     
                ) : (
                    <div className="contentSection">
                        <div className="inputform">  
                            <div className="input"> 
                                <div className="inputDescription">Email Address</div>
                                <TextField 
                                    id="email" 
                                    size="small" 
                                    fullWidth   
                                    required
                                    variant="outlined"  
                                    value={this.state.email}
                                    onChange={this.setSignUpInput}
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
                                        onChange={this.setSignUpInput}
                                        id='groupType'
                                    >
                                    {groupTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </Select>
                                    {this.state.groupType=== "-" && <FormHelperText>You need to choose an option</FormHelperText>}
                                </FormControl>
                            </div>
                            <div className="input"> 
                                <div className="inputDescription">
                                    {this.state.groupType === 'Organization' ? ('Organization Name') : ('Event Name')} 
                                </div>
                                <TextField 
                                    id="accountName" 
                                    size="small" 
                                    fullWidth   
                                    required
                                    variant="outlined"  
                                    value={this.state.accountName}
                                    onChange={this.setSignUpInput}
                                    error={this.state.accountName.length < 1} 
                                    helperText={this.state.accountName.length < 1 ? 'Please enter a name' : ' '} 
                                />
                            </div>
                            <div className="input"> 
                                <div className="inputDescription">Will you be an admin or user?</div>
                                <FormControl variant="outlined" error ={this.state.userType=== "-"} >
                                    <Select
                                        native
                                        value={this.state.userType}
                                        onChange={this.setSignUpInput}
                                        id='userType'
                                    >
                                    {userTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </Select>
                                    {this.state.userType=== "-" && <FormHelperText>You need to choose an option</FormHelperText>}
                                </FormControl>
                            </div>
                            <div className="input"> 
                                <div className="inputDescription">Subscription</div>
                                <FormControl variant="outlined" error ={this.state.subscription=== "-"}>
                                    <Select
                                        native
                                        value={this.state.subscription}
                                        onChange={this.setSignUpInput}
                                        id='subscription'
                                    >
                                    { this.state.groupType === 'Organization' ? (
                                            subscriptionOrganization.map((item) => <option key={item} value={item}>{item}</option>)
                                        ) : ( this.state.groupType === 'Event') && (
                                            subscriptionEvent.map((item) => <option key={item} value={item}>{item}</option>)
                                        ) 
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
                    </div>    
                )}
            <ToastContainer />
        </div>
        )
    }
}

export default withRouter(SignUp);
