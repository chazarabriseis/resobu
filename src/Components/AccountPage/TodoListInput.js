import React, { Component } from 'react';


export default class TodoListInput extends Component {

    render() {  
        const todoList = {...this.props.todoList}
        return (
            <ul style= {{listStyle: 'none'}}>
                <li>
                    <input id="todo-checkbox-button1" className="todoList" type="checkbox" value='enteredEmails' checked={todoList.enteredEmails} disabled={!this.props.changeTodoList?"disabled":""} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button1">Entered all people who should be part of the social btterfly chats</label> 
                </li>
                <li>
                    <input id="todo-checkbox-button3" className="todoList" type="checkbox" value='choseMeetingTime' checked={todoList.choseMeetingTime} disabled={!this.props.changeTodoList?"disabled":""} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button3">Chose a recurring chat time so we can start scheduling chats</label>
                </li>
                <li>
                    <input id="todo-checkbox-button3" className="todoList" type="checkbox" value='scheduledMeeting' checked={todoList.scheduledMeeting} disabled={!this.props.changeTodoList?"disabled":""} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button3">Sent an invite out to everyone to block time in their calendars</label>
                </li>
                <li>
                    <input id="todo-checkbox-button2" className="todoList" type="checkbox" value='personalisedInvite' checked={todoList.personalisedInvite} disabled={!this.props.changeTodoList?"disabled":""} onChange={this.props.onSetTodoList}/>
                    <label htmlFor="todo-checkbox-button2">Personalised the invite text</label>
                </li>
            </ul>    
        )
    }
}

