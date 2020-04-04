import React from 'react';
import Room from '../definitions/room';

export default class GameArea extends React.Component<PropsType> {
  renderWhiteCards = () => {
    return this.props.room.whiteCards.map(card => <li>{card}</li>);
  }

  handleShuffleWhiteCardsClick = () => {
    this.props.socket.emit('shuffle white cards', this.props.roomId);
  }

  renderBlackCards = () => {
    return this.props.room.blackCards.map(card => <li>{card.text}</li>);
  }

  handleShuffleBlackCardsClick = () => {
    this.props.socket.emit('shuffle black cards', this.props.roomId);
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          {this.props.room.whiteCards.length > 0 && <button onClick={this.handleShuffleWhiteCardsClick}>Shuffle</button>}
          {this.props.room.whiteCards.length > 0 && this.renderWhiteCards()}
        </div>
        <div className="column">
          {this.props.room.blackCards.length > 0 && <button onClick={this.handleShuffleBlackCardsClick}>Shuffle</button>}
          {this.props.room.blackCards.length > 0 && this.renderBlackCards()}
        </div>
      </div>
    )
  }
}

interface PropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: Room;
}
