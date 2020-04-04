import React from 'react';
import Room from '../definitions/room';
import AnswerCard from './AnswerCard';
import AnswerCardType from '../definitions/answer-card';

export default class AnswerCardArea extends React.Component<PropsType> {
  handleCardClick = (card: AnswerCardType) => {
    this.props.socket.emit('reveal card', this.props.roomId, card)
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Answer cards</h3>

        <div className="columns is-multiline">
          {this.props.room.answerCards.map(card =>
            <div className="column is-one-quarter">
              <AnswerCard card={card} onCardClick={this.handleCardClick}></AnswerCard>
            </div>
          )}
        </div>
      </div>
    );
  }
}

interface PropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: Room;
}
