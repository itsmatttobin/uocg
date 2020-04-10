import React from 'react';
import IRoom from '../definitions/room';
import BlackCard from './BlackCard';
import EVENTS from '../definitions/events';
import StartRound from './StartRound';

export default class CurrentCard extends React.Component<IPropsType> {
  handleDrawBlackCardClick = () => {
    if (this.props.room.blackCards.length > 0) {
      this.props.socket.emit(EVENTS.DRAW_BLACK_CARD, this.props.roomId);
    }
  }

  renderCurrentCard = () => this.props.room.currentCard ? <BlackCard card={this.props.room.currentCard} /> : <StartRound />;

  render() {
    return (
      <div>
        <div className="button-section">
          <button className="button is-info is-fullwidth" onClick={this.handleDrawBlackCardClick}>Draw question card</button>
        </div>

        <div>
          {this.renderCurrentCard()}
          <div className="has-text-centered has-text-grey-light is-size-7 cards-remaining">
            Cards left: {this.props.room.blackCards.length}
          </div>
        </div>
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: IRoom;
}
