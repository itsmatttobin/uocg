import React from 'react';
import Room from "../definitions/room";
import BlackCard from './BlackCard';

export default class CurrentCard extends React.Component<PropsType> {
  handleDrawBlackCardClick = () => {
    if (this.props.room.blackCards.length > 1) {
      this.props.socket.emit('draw black card', this.props.roomId);
    }
  }

  renderCurrentCard = () => {
    return this.props.room.currentCard && <BlackCard card={this.props.room.currentCard}></BlackCard>
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Current card</h3>

        <div>
            {this.renderCurrentCard()}
        </div>

        <div className="button-section button-section--bottom">
          <button className="button is-black" onClick={this.handleDrawBlackCardClick}>Draw black card</button>
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
