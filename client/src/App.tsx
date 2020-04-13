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
import EVENTS from './definitions/events';
import IPlayer from './definitions/player';
import IAnswerCard from './definitions/answer-card';
import IBlackCard from './definitions/black-card';
import IRoundModal from './definitions/round-modal';
import RoundModal from './components/RoundModal';
import ReactGA from 'react-ga';

export default class App extends React.Component<{}, IStateType> {
  state: IStateType = {
    host: process.env.REACT_APP_SERVER_HOST || '',
    room: {
      id: '',
      blackCards: [],
      whiteCards: [],
      players: [],
      currentCard: null,
      answerCards: [],
    },
    playerState: PLAYER_STATE.NOT_IN_ROOM,
    roundModal: {
      open: false,
      player: null,
      question: null,
      answer: null,
    },
    connectionError: false,
  };

  socket = socketIOClient(this.state.host);

  componentDidMount = () => {
    // Watch for changes when the current room updates
    this.socket.on(EVENTS.UPDATE_ROOM, (room: IRoom) => {
      this.setState({ room, playerState: PLAYER_STATE.JOINED_ROOM });
    });

    // Display round winner
    this.socket.on(EVENTS.END_OF_ROUND, (player: IPlayer, question: IBlackCard, answer: IAnswerCard) => {
      this.setState({
        roundModal: {
          open: true,
          player,
          question,
          answer,
        },
      });
    });

    // Set disconnected state
    this.socket.on('disconnect', () => {
      this.setState({ connectionError: true });
    });

    // Analytics
    if (process.env.NODE_ENV === 'production') {
      const trackingCode = process.env.REACT_APP_GA_TRACKING_CODE || '';
      ReactGA.initialize(trackingCode);
      ReactGA.pageview('/home');
    }

    this.socket.on(EVENTS.ROOM_CREATED, (roomId: string) => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.event({
          category: 'Room',
          action: 'Created',
          label: roomId,
        });
      }
    });

    this.socket.on(EVENTS.PLAYER_JOINED_ROOM, () => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.event({
          category: 'Room',
          action: 'Player joined',
        });
      }
    });

    this.socket.on(EVENTS.ROUND_START, () => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.event({
          category: 'Round',
          action: 'Started',
        });
      }
    });

    this.socket.on(EVENTS.ROUND_END, (currentCard: IBlackCard, card: IAnswerCard) => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.event({
          category: 'Round',
          action: 'Ended',
          label: `${currentCard.text} | ${card.text}`,
        });
      }
    });
  }

  handleStartRoom = (name: string) => {
    this.socket.emit(EVENTS.START_ROOM, name);

    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview('/inRoom');
    }
  }

  handleJoinRoom = (roomId: string, name: string) => {
    this.socket.emit(EVENTS.JOIN_ROOM, roomId, name);

    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview('/inRoom');
    }
  }

  hasPlayerJoinedRoom = () => this.state.playerState === PLAYER_STATE.JOINED_ROOM;

  handleModalContinue = () => {
    this.setState({
      roundModal: {
        open: false,
        player: null,
        question: null,
        answer: null,
      },
    });
  }

  handleRestartGame = () => {
    this.socket.emit(EVENTS.RESTART_GAME, this.state.room.id);
  }

  render() {
    return (
      <div className="wrapper">
        <Header/>

        <div className="main">
          {!this.hasPlayerJoinedRoom() && (
            <JoinGame onStartRoom={this.handleStartRoom} onJoinRoom={this.handleJoinRoom} socket={this.socket} />
          )}

          {this.hasPlayerJoinedRoom() && (
            <div className="columns">
              <div className="column">
                <GameArea
                  socket={this.socket}
                  room={this.state.room}
                  connectionError={this.state.connectionError}
                />
              </div>
              <div className="column is-2">
                <PlayerList players={this.state.room.players} onRestartGame={this.handleRestartGame} />
              </div>
            </div>
          )}
        </div>

        <RoundModal modal={this.state.roundModal} onContinueClick={this.handleModalContinue} />

        <Footer/>
      </div>
    );
  }
}

interface IStateType {
  host: string;
  room: IRoom;
  playerState: PLAYER_STATE;
  roundModal: IRoundModal;
  connectionError: boolean;
}
