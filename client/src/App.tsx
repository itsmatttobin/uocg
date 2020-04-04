import React, { ChangeEvent } from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client';
import PLAYER_STATE from './definitions/player-state';
import Room from './definitions/room';

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
        <h3 className="title is-5">Players</h3>
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

  renderWhiteCards = () => {
    return this.state.room.whiteCards.map(card => <li>{card}</li>);
  }

  handleShuffleWhiteCardsClick = () => {
    this.socket.emit('shuffle white cards', this.state.roomId);
  }

  renderBlackCards = () => {
    return this.state.room.blackCards.map(card => <li>{card.text}</li>);
  }

  handleShuffleBlackCardsClick = () => {
    this.socket.emit('shuffle black cards', this.state.roomId);
  }

  render() {
    return (
      <div className="App">
        <h3 className="title is-4">Join room</h3>
        Room ID: <input type="text" value={this.state.roomId} onChange={this.handleRoomIdChange} />
        Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <button onClick={this.handleJoinClick} disabled={!this.isJoinEnabled()}>Join</button>

        <hr/>

        {this.state.playerState === PLAYER_STATE.JOINED_ROOM &&
          <div className="play-area columns">
            <div className="column">
              <div className="columns">
                <div className="column">
                  {this.state.room.whiteCards.length > 0 && <button onClick={this.handleShuffleWhiteCardsClick}>Shuffle</button>}
                  {this.state.room.whiteCards.length > 0 && this.renderWhiteCards()}
                </div>
                <div className="column">
                  {this.state.room.blackCards.length > 0 && <button onClick={this.handleShuffleBlackCardsClick}>Shuffle</button>}
                  {this.state.room.blackCards.length > 0 && this.renderBlackCards()}
                </div>
              </div>
            </div>
            <div className="column is-2">
              {this.renderPlayerList()}
            </div>
          </div>}
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
