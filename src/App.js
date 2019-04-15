import React, { Component } from 'react';
import './App.css';
import Form from './Form';

const TOKEN = 'XM4jwxS3mvbU'
const author = 'Sara'

const messageRequest = new Request(`https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=${TOKEN}`)

function getAllMessages () {
  return fetch(messageRequest)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Could not retrieve messages')
    })
    .catch((error) => {
      console.log('There was a problem with the network')
    })
}

function getNewMessagesSince(lastMessage) {
  fetch(`${messageRequest.url}&since=${lastMessage.timestamp}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Could not retrieve messages')
    })
    .catch((error) => {
      console.log('There was a problem with the network')
      // TODO: something better than console.log ;)
    })
}

function createMessage(text) {
  const message = { message: text, author: author }
  console.log(message)
  return fetch(messageRequest, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    // getNewMessagesSince(lastMessageTime)
  })
  .catch((error) => {
    console.log(error)
    console.log('There was a problem with the network')
    // TODO: something better than console.log ;)
  })
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }

    this.createNewMessage = this.createNewMessage.bind(this)
  }

  componentDidMount() {
    console.log("I mounted!")
    getAllMessages().then((messages) => {
      this.setState({ messages })
    }).catch((error) => {
      console.log("oh not something went wrong")
    })
  }

  createNewMessage(text) {
    createMessage(text).then((message) => {
      const messages = [...this.state.messages, message]
      this.setState({ messages })
    })
  }

  render() {
    return (
      <div className="chat">
        <section className="messages">
          {this.state.messages.map((message) => (
            <div className="message author" key={ message._id }>
              <p>{ message.message }</p>
              <p>{ message.timestamp }</p>
            </div>
          ))}
        </section>

        <div className="footer fcc">
          <Form onSubmit={ this.createNewMessage } />
        </div>
      </div>
    );
  }
}

export default App;
