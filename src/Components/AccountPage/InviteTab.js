import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './tabs.css'


export default class InviteTab extends Component {

  render() {  
      const modules = {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] }
            ]
          ]
        },
        clipboard: { matchVisual: false }
      };
    
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "size",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "align"
      ];

      return (
            <div className="tab">
              <div className="tabContent">
                <Button variant="contained" className="actionButton" disabled={this.props.changeInvite} onClick={this.props.onChangeInviteText}>Change Invite Text</Button>   
                <Button variant="contained" className="actionButton"  disabled={!this.props.changeInvite} onClick={this.props.onSaveChangeInviteText}>Save</Button>   
                <Button variant="contained" className="ghostButton"  disabled={!this.props.changeInvite} onClick={this.props.onCancelChangeInviteText}>Cancel</Button>
                <div className='heading4'>
                  Here you can set the tone of the Remote Social Butterfly chats, should it be purly random what people talk about or do you want to guide the chat with a few questions they should discuss, 
                  e.g. What are you struggeling with at the moment? What is the tool that makes your work more efficient? How do you think we can help our clients the most?
                </div>
                <div className="p">
                  <ReactQuill
                    readOnly={!this.props.changeInvite}
                    value={this.props.inviteText}
                    onChange={this.props.onSetInviteText}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </div>  
            </div>
        )
  }
}
