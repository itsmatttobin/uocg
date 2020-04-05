import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client';
import PLAYER_STATE from './definitions/player-state';
import IRoom from './definitions/room';
import PlayerList from './components/PlayerList';
import JoinGame from './components/JoinGame';
import GameArea from './components/GameArea';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends React.Component<{}, IStateType> {
  state: IStateType = {
    host: 'http://localhost:4000',
    roomId: '',
    name: '',
    room: {
      id: '',
      blackCards: [],
      whiteCards: [],
      players: [],
      currentCard: null,
      answerCards: [],
    },
    playerState: PLAYER_STATE.NOT_IN_ROOM,
    socketId: '',
  };

  socket = socketIOClient(this.state.host);

  componentDidMount = () => {
    this.socket.on('connect', () => {
      this.setState({ socketId: this.socket.id });
    });

    // Watch for changes when the current room updates
    this.socket.on('update room', (room: any) => {
      this.setState({ room, playerState: PLAYER_STATE.JOINED_ROOM });
    });

    // Remove player from the room when leaving
    window.addEventListener('unload', () => {
      if (this.hasPlayerJoinedRoom()) {
        // TODO: Add white cards back to the deck
        this.socket.emit('leave room', this.state.socketId, this.state.roomId);
      }
    });
  }

  handleJoinRoom = (roomId: string, name: string) => {
    this.setState({ roomId, name }, () => {
      this.socket.emit('join room', this.state.roomId, this.state.name);
    });
  }

  hasPlayerJoinedRoom = () => this.state.playerState === PLAYER_STATE.JOINED_ROOM;

  render() {
    return (
      <div className="wrapper">
        <Header/>

        <div className="main">
          {!this.hasPlayerJoinedRoom() && <JoinGame onJoinRoom={this.handleJoinRoom} />}

          {this.hasPlayerJoinedRoom() && (
            <div className="columns">
              <div className="column">
                <GameArea socket={this.socket} roomId={this.state.roomId} room={this.state.room} />
              </div>
              <div className="column is-2">
                <PlayerList players={this.state.room.players} />
              </div>
            </div>
          )}
        </div>

        <Footer/>
      </div>
    );
  }
}

interface IStateType {
  host: string;
  roomId: string;
  name: string;
  room: IRoom;
  playerState: PLAYER_STATE;
  socketId: string;
}
