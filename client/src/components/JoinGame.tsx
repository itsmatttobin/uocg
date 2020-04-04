import React, { ChangeEvent } from 'react';

export default class JoinGame extends React.Component<PropsType, StateType> {
  state: StateType = {
    roomId: '',
    name: '',
  }

  handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: e.target.value });
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  handleJoinClick = () => {
    this.props.onJoinRoom(this.state.roomId, this.state.name);
  }

  isJoinEnabled = () => {
    return true;
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Join room</h3>
        Room ID: <input type="text" value={this.state.roomId} onChange={this.handleRoomIdChange} />
        Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <button onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>Join</button>

        <hr/>
      </div>
    );
  }
}

interface PropsType {
  onJoinRoom: (roomId: string, name: string) => void;
}

interface StateType {
  roomId: string;
  name: string;
}
