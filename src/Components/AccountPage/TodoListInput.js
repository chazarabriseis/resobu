import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';


export default class TodoListInput extends Component {

    render() {  
        const todoList = {...this.props.todoList}

        const GreenCheckbox = withStyles({
            root: {
              color: purple[400],
              '&$checked': {
                color: purple[600],
              },
            },
            checked: {},
          })((props) => <Checkbox color="default" {...props} />);

        return (
            <ul style= {{listStyle: 'none'}}>
                <li>
                    <GreenCheckbox id="todoList" value='enteredEmails' checked={todoList.enteredEmails} disabled={!this.props.changeTodoList?true:false} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button1" className={!this.props.changeTodoList?'inputDisabled':''} >Entered all people who should be part of the Remote Social Butterfly chats</label> 
                </li>
                <li>
                    <GreenCheckbox id="todoList" value='choseMeetingTime' checked={todoList.choseMeetingTime} disabled={!this.props.changeTodoList?true:false} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button3" className={!this.props.changeTodoList?'inputDisabled':''}>Chose a recurring chat time so we can start scheduling chats</label>
                </li>
                <li>
                    <GreenCheckbox id="todoList" value='scheduledMeeting' checked={todoList.scheduledMeeting} disabled={!this.props.changeTodoList?true:false} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button3" className={!this.props.changeTodoList?'inputDisabled':''}>Sent an invite out to everyone to block time in their calendars</label>
                </li>
                <li>
                    <GreenCheckbox id="todoList"  value='personalisedInvite' checked={todoList.personalisedInvite} disabled={!this.props.changeTodoList?true:false} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button2" className={!this.props.changeTodoList?'inputDisabled':''}>Personalised the invite text</label>
                </li>
                <li>
                    <GreenCheckbox id="todoList"  value='activated' checked={todoList.activated} disabled={!this.props.changeTodoList?true:false} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button2" className={!this.props.changeTodoList?'inputDisabled':''}>Activated switch above to send invites for Remote Social Butterfly chats out</label>
                </li>
                
            </ul>    
        )
    }
}

