import React from 'react';
import IRoom from '../definitions/room';
import AnswerCard from './AnswerCard';
import IAnswerCardType from '../definitions/answer-card';
import EVENTS from '../definitions/events';

export default class AnswerCardArea extends React.Component<IPropsType> {
  handleCardClick = (card: IAnswerCardType) => {
    this.props.socket.emit(EVENTS.REVEAL_CARD, this.props.room.id, card);
  }

  handleChooseCardClick = (card: IAnswerCardType) => {
    this.props.socket.emit(EVENTS.CHOOSE_WINNING_CARD, this.props.room.id, card, this.props.room.currentCard);
  }

  render() {
    return (
      <div className="answer-card-section">
        <h3 className="title title--answer-area is-4">Answer cards</h3>

        <div className="card-row__container">
          <div className="columns is-multiline card-row">
            {this.props.room.answerCards.map((card, index) => (
              <div  key={index} className="column is-5-tablet is-3-desktop">
                <AnswerCard card={card} onCardClick={this.handleCardClick} onChooseCardClick={this.handleChooseCardClick} />
              </div>
            ))}
          </div>
        </div>
        {!this.props.room.answerCards.length && (
          <div className="is-size-6 has-text-grey-light hand-tip">
            Answer cards will be displayed here when played.
          </div>
        )}
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  room: IRoom;
}
