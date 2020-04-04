import React from 'react';
import Room from '../definitions/room';
import PlayedCard from './PlayedCard';
import PlayedCardType from '../definitions/played-card';

export default class PlayedCardArea extends React.Component<PropsType> {
  handleCardClick = (card: PlayedCardType) => {
    this.props.socket.emit('reveal card', this.props.roomId, card)
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Played cards</h3>

        <div className="columns is-multiline">
          {this.props.room.playedCards.map(card =>
            <div className="column is-one-quarter">
              <PlayedCard card={card} onCardClick={this.handleCardClick}></PlayedCard>
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
