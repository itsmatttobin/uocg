import React, { ChangeEvent } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

export default class App extends React.Component<{}, StateType> {
  state: StateType = {
    host: 'http://localhost:4000',
    message: '',
    messages: [],
  }

  socket = socketIOClient(this.state.host);

  componentDidMount() {
    this.socket.on('new message', this.appendMessage);
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  }

  handleClick = () => {
    this.socket.emit('chat message', this.state.message);
    this.setState({ message: '' });
  }

  appendMessage = (message: string) => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  renderMessages = () => {
    return this.state.messages.map(msg => <li key={msg}>{msg}</li>);
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.message} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Send</button>

        <hr/>

        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

interface StateType {
  host: string;
  message: string;
  messages: string[];
}
