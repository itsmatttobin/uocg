import React, { ChangeEvent } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

export default class App extends React.Component<{}, StateType> {
  state: StateType = {
    host: 'http://localhost:4000',
    roomId: '',
    room: {},
  }

  socket = socketIOClient(this.state.host);

  componentDidMount = () => {
    this.socket.on('update room', (room: any) => {
      this.setState({ room });
    });
  }

  handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: e.target.value });
  }

  handleJoinClick = () => {
    this.socket.emit('join room', this.state.roomId);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.roomId} onChange={this.handleRoomIdChange} />
        <button onClick={this.handleJoinClick}>Join</button>
      </div>
    );
  }
}

interface StateType {
  host: string;
  roomId: string;
  room: any;
}
