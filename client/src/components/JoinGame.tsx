import React, { ChangeEvent } from 'react';

export default class JoinGame extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    roomId: '',
    name: '',
  };

  handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: e.target.value });
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  handleJoinClick = () => {
    this.props.onJoinRoom(this.state.roomId, this.state.name);
  }

  isJoinEnabled = () => this.state.roomId && this.state.name;

  render() {
    return (
      <div>
        <h3 className="title is-4">Join room</h3>

        <div className="columns">
          <div className="column is-one-quarter">
            <div className="field">
              <label className="label">Room ID:</label>
              <input type="text" className="input" value={this.state.roomId} onChange={this.handleRoomIdChange} />
            </div>

            <div className="field">
              <label className="label">Name:</label>
              <input type="text" className="input" value={this.state.name} onChange={this.handleNameChange} />
            </div>

            <button className="button" onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>Join</button>
          </div>
        </div>
      </div>
    );
  }
}

interface IPropsType {
  onJoinRoom: (roomId: string, name: string) => void;
}

interface IStateType {
  roomId: string;
  name: string;
}
