import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import TodoListInput from './TodoListInput'

import './tabs.css'


export default class TodoTab extends Component {

  render() {  
    return (
          <div className="tab">
            <div className="tabContent">

              <Button variant="contained" size="large" className="actionButton" disabled={this.props.changeTodoList} onClick={this.props.onChangeTodoList}>Change Todo List</Button>       
              <Button variant="contained" size="large" className="actionButton"  disabled={!this.props.changeTodoList} onClick={this.props.onSaveChangeTodoList}>Save</Button>   
              <Button variant="contained" size="large" className="ghostButton"  disabled={!this.props.changeTodoList} onClick={this.props.onCancelChangeTodoList}>Cancel</Button>

              <TodoListInput 
                changeTodoList={this.props.changeTodoList}
                todoList={this.props.todoList}
                onSetTodoList={this.props.onSetTodoList}
              />

            </div>  
          </div>
    )
  }

}

