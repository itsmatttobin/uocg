import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client';
import PLAYER_STATE from './definitions/player-state';
import Room from './definitions/room';
import PlayerList from './components/PlayerList';
import JoinGame from './components/JoinGame';

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

  handleJoinRoom = (roomId: string, name: string) => {
    this.setState({ roomId, name }, () => {
      this.socket.emit('join room', this.state.roomId, this.state.name);
    });
  }

  hasPlayerJoinedRoom = () => {
    return this.state.playerState === PLAYER_STATE.JOINED_ROOM;
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
        <JoinGame onJoinRoom={this.handleJoinRoom}></JoinGame>

        {this.hasPlayerJoinedRoom() &&
          <div className="columns">
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
              <PlayerList players={this.state.room.players}></PlayerList>
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
