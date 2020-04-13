import React from 'react';
import IRoom from '../definitions/room';
import Hand from './Hand';
import CurrentCard from './CurrentCard';
import AnswerCardArea from './AnswerCardArea';

export default class GameArea extends React.Component<IPropsType> {
  componentDidMount = () => {
    // Display warning before leaving / reloading the page
    window.addEventListener('beforeunload', e => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  getCurrentPlayerHand = () => {
    const currentPlayer = this.props.room.players.find(player => player.id === this.props.socket.id);
    const hand =  currentPlayer ? currentPlayer.hand : [];
    return hand;
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Room ID: {this.props.room.id}</h3>

        <hr/>

        <div className="columns">
          <div className="column is-one-fifth">
            <CurrentCard socket={this.props.socket} room={this.props.room} />
          </div>

          <div className="column is-four-fifths">
            <AnswerCardArea socket={this.props.socket} room={this.props.room} />
          </div>
        </div>

        <hr/>

        <Hand socket={this.props.socket} room={this.props.room} hand={this.getCurrentPlayerHand()} />

        {this.props.connectionError && (
          <div className="connection-error has-text-centered has-background-danger has-text-white">
            <p className="has-text-weight-bold">Connection error!</p>
            <p className="is-size-7">Please refresh and rejoin the room</p>
          </div>
        )}
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  room: IRoom;
  connectionError: boolean;
}
