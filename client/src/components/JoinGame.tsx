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
        <div className="column is-3">
          <div className="title is-4">Player</div>
          <div className="field">
            <input type="text" className="input" placeholder="Enter your name" value={this.state.name} onChange={this.handleNameChange} />
          </div>
        </div>

        <div className="column is-1" />

        <div className="column is-3">
          <h3 className="title is-4">Join existing room</h3>
          <div className="columns">
            <div className="column">
              <div className="field">
                <input type="text" className="input" placeholder="Room ID" value={this.state.roomId} onChange={this.handleRoomIdChange} />
              </div>
            </div>
            <div className="column is-4">
              <div className="field">
                <button className="button is-info is-fullwidth" onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>
                  Join
                </button>
              </div>
            </div>
          </div>

          {this.state.joinRoomError && <p className="has-text-danger">Room does not exist</p>}
        </div>

        <div className="column is-1" />

        <div className="column is-3">
          <div className="title is-4">Start new room</div>
          <div className="field">
            <button className="button is-info is-fullwidth" onClick={this.handleStartClick} disabled={!this.isStartEnabled()}>
              Start new room
            </button>
          </div>
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
