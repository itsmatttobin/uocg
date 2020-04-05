import React from 'react';
import IRoom from '../definitions/room';
import Hand from './Hand';
import CurrentCard from './CurrentCard';
import AnswerCardArea from './AnswerCardArea';

export default class GameArea extends React.Component<IPropsType> {
  handleShuffleWhiteCardsClick = () => {
    this.props.socket.emit('shuffle white cards', this.props.roomId);
  }

  handleShuffleBlackCardsClick = () => {
    this.props.socket.emit('shuffle black cards', this.props.roomId);
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Room ID: {this.props.room.id}</h3>

        <div className="buttons">
          {this.props.room.blackCards.length > 0 && (
            <button className="button is-info" onClick={this.handleShuffleBlackCardsClick}>
              Shuffle question cards
            </button>
          )}
          {this.props.room.whiteCards.length > 0 && (
            <button className="button" onClick={this.handleShuffleWhiteCardsClick}>
              Shuffle answer cards
            </button>
          )}
        </div>

        <hr/>

        <div className="columns">
          <div className="column is-one-fifth">
            <CurrentCard socket={this.props.socket} roomId={this.props.roomId} room={this.props.room} />
          </div>

          <div className="column is-four-fifths">
            <AnswerCardArea socket={this.props.socket} roomId={this.props.roomId} room={this.props.room} />
          </div>
        </div>

        <hr/>

        <Hand socket={this.props.socket} roomId={this.props.roomId} room={this.props.room} />
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: IRoom;
}
