import React from 'react';
import IRoom from '../definitions/room';
import WhiteCard from './WhiteCard';
import EVENTS from '../definitions/events';

export default class Hand extends React.Component<IPropsType> {
  handleDrawCardClick = () => {
    if (this.props.hand.length < 10) {
      this.props.socket.emit(EVENTS.DRAW_WHITE_CARD, this.props.roomId, this.props.socket.id);
    }
  }

  handlePlayCard = (card: string) => {
    if (this.props.room.currentCard) {
      this.props.socket.emit(EVENTS.PLAY_CARD, this.props.roomId, card, this.props.socket.id);
    }
  }

  isDrawCardDisabled = () => this.props.hand.length === 10;

  hasQuestionCard = () => !!this.props.room.currentCard;

  render() {
    return (
      <div>
        <h3 className="title is-4">Your hand</h3>

        <div className="columns">
          <div className="column is-one-fifth">
            <button className="button is-fullwidth" onClick={this.handleDrawCardClick} disabled={this.isDrawCardDisabled()}>
              Draw answer card
            </button>
          </div>
        </div>

        <div className="columns is-multiline">
          {this.props.hand.map((card, index) => (
            <div key={index} className="column is-one-fifth">
              <WhiteCard card={card} isPlayable={this.hasQuestionCard()} onPlayCard={this.handlePlayCard} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: IRoom;
  hand: string[];
}
