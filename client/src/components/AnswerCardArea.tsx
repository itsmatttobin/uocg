import React from 'react';
import IRoom from '../definitions/room';
import AnswerCard from './AnswerCard';
import IAnswerCardType from '../definitions/answer-card';

export default class AnswerCardArea extends React.Component<IPropsType> {
  handleCardClick = (card: IAnswerCardType) => {
    this.props.socket.emit('reveal card', this.props.roomId, card);
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Answer cards</h3>

        <div className="columns is-multiline">
          {this.props.room.answerCards.map((card, index) => (
            <div  key={index} className="column is-one-quarter">
              <AnswerCard card={card} onCardClick={this.handleCardClick} />
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
}
