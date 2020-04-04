import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client';
import PLAYER_STATE from './definitions/player-state';
import Room from './definitions/room';
import PlayerList from './components/PlayerList';
import JoinGame from './components/JoinGame';
import GameArea from './components/GameArea';

export default class App extends React.Component<{}, StateType> {
  state: StateType = {
    host: 'http://localhost:4000',
    roomId: '',
    name: '',
    room: {
      blackCards: [],
      whiteCards: [],
      players: [],
      currentCard: null,
      playedCards: [],
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

  render() {
    return (
      <div className="app">
        <JoinGame onJoinRoom={this.handleJoinRoom}></JoinGame>

        {this.hasPlayerJoinedRoom() &&
          <div className="columns">
            <div className="column">
              <GameArea socket={this.socket} roomId={this.state.roomId} room={this.state.room}></GameArea>
            </div>
            <div className="column is-2">
              <PlayerList players={this.state.room.players}></PlayerList>
            </div>
          </div>
        }
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
