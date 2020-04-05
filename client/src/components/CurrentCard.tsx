import React from 'react';
import IRoom from '../definitions/room';
import BlackCard from './BlackCard';

export default class CurrentCard extends React.Component<IPropsType> {
  handleDrawBlackCardClick = () => {
    if (this.props.room.blackCards.length > 1) {
      this.props.socket.emit('draw black card', this.props.roomId);
    }
  }

  renderCurrentCard = () => this.props.room.currentCard && <BlackCard card={this.props.room.currentCard} />;

  render() {
    return (
      <div>
        <h3 className="title is-4">Question card</h3>

        <div>
            {this.renderCurrentCard()}
        </div>

        <div className="button-section button-section--bottom">
          <button className="button is-info" onClick={this.handleDrawBlackCardClick}>Draw question card</button>
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
