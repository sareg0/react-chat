import React, { Component } from 'react';
//TODO: create message list component?
//TODO: create different components for the person v. from someone else?
class Message extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return(
      <div className="message author">
        <p>{ this.props.text }</p>
        <p>{ this.props.timestamp }</p>
      </div>
    )
  }
}

export default Message