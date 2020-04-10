import React, { ChangeEvent } from 'react';
import EVENTS from '../definitions/events';

export default class JoinGame extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    roomId: '',
    name: '',
    joinRoomError: false,
  };

  componentDidMount = () => {
    // Handle error if no room exists
    this.props.socket.on(EVENTS.NO_ROOM_EXISTS, () => {
      this.setState({ joinRoomError: true });
    });
  }

  handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: e.target.value, joinRoomError: false });
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  handleStartClick = () => {
    this.props.onStartRoom(this.state.name);
  }

  handleJoinClick = () => {
    this.props.onJoinRoom(this.state.roomId, this.state.name);
  }

  isStartEnabled = () => !!this.state.name;

  isJoinEnabled = () => this.state.roomId && this.state.name;

  render() {
    return (
      <div className="columns">
        <div className="column is-one-quarter">
          <div className="title is-4">Player</div>
          <div className="field">
            <label className="label">Player name:</label>
            <input type="text" className="input" value={this.state.name} onChange={this.handleNameChange} />
          </div>

          <hr/>

          <div className="title is-4">Start new room</div>
          <div className="field">
            <button className="button is-info" onClick={this.handleStartClick} disabled={!this.isStartEnabled()}>Start new room</button>
          </div>

          <hr/>

          <h3 className="title is-4">Join existing room</h3>
          <div className="field">
            <label className="label">Room ID:</label>
            <input type="text" className="input" value={this.state.roomId} onChange={this.handleRoomIdChange} />
          </div>

          <div className="field">
            <button className="button is-info" onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>Join</button>
          </div>

          {this.state.joinRoomError && <p className="has-text-danger">Error: Room does not exist</p>}
        </div>
      </div>
    );
  }
}

interface IPropsType {
  onStartRoom: (name: string) => void;
  onJoinRoom: (roomId: string, name: string) => void;
  socket: SocketIOClient.Socket;
}

interface IStateType {
  roomId: string;
  name: string;
  joinRoomError: boolean;
}
