import React, { ChangeEvent } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

export default class App extends React.Component<{}, StateType> {
  state: StateType = {
    host: 'http://localhost:4000',
    roomId: '',
    name: '',
    room: {
      blackCards: [],
      whiteCards: [],
      players: [],
    },
    playerState: PLAYER_STATE.NOT_IN_ROOM,
  }

  socket = socketIOClient(this.state.host);

  componentDidMount = () => {
    this.socket.on('update room', (room: any) => {
      this.setState({ room, playerState: PLAYER_STATE.JOINED_ROOM });
    });
  }

  handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: e.target.value });
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  isJoinEnabled = () => {
    return this.state.roomId && this.state.name;
  }

  handleJoinClick = () => {
    this.socket.emit('join room', this.state.roomId, this.state.name);
  }

  renderPlayerList = () => {
    return (
      <div>
        <h3>Players</h3>
          <ul>
            {!this.state.room.players.length && <li>No players</li>}
            {this.renderPlayer()}
          </ul>
      </div>
    );
  }

  renderPlayer = () => {
    return this.state.room.players && this.state.room.players.map((player: any) => <li key={player.id}>{player.name}</li>);
  }

  render() {
    return (
      <div>
        <h3>Join room</h3>
        Room ID: <input type="text" value={this.state.roomId} onChange={this.handleRoomIdChange} />
        Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <button onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>Join</button>

        <hr/>

        {this.state.playerState === PLAYER_STATE.JOINED_ROOM && this.renderPlayerList()}
      </div>
    );
  }
}

interface StateType {
  host: string;
  roomId: string;
  name: string;
  room: Room;
  playerState: PLAYER_STATE;
}

interface Room {
  blackCards: BlackCard[];
  whiteCards: string[];
  players: Player[];
}

interface BlackCard {
  text: string;
  pick: number;
}

interface Player {
  id: string;
  name: string;
  hand: string[];
}

enum PLAYER_STATE {
  NOT_IN_ROOM,
  JOINED_ROOM,
}
