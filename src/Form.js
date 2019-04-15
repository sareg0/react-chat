import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render() {
    return (
      <form id="message-form" className="footer__form fcc" action="" onSubmit={ this.handleSubmit }>
        <label htmlFor="message" className="sr-only">Message</label>
        <input 
          id="message" 
          className="footer__text-input w-40 p5 rounded-corner" 
          type="text" 
          placeholder="Message" 
          onChange={ this.handleChange } 
        />
        <input 
          className="footer__button ml5 p5 rounded-corner" 
          type="submit" 
          value="Send" />
      </form>
    );
  }
}

export default Form;