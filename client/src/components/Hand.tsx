import React from 'react';
import IRoom from '../definitions/room';
import WhiteCard from './WhiteCard';

export default class Hand extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    whiteCards: [],
  };

  handleDrawCardClick = () => {
    if (this.state.whiteCards.length < 10) {
      this.setState({ whiteCards: [...this.state.whiteCards, this.props.room.whiteCards[0]] });
      this.props.socket.emit('draw white card', this.props.roomId);
    }
  }

  handlePlayCard = (card: string) => {
    const hand = [...this.state.whiteCards];
    const index = hand.indexOf(card);
    hand.splice(index, 1);

    this.setState({ whiteCards: hand }, () => {
      this.props.socket.emit('play card', this.props.roomId, card);
    });
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Your hand</h3>

        <div className="button-section">
          <button className="button" onClick={this.handleDrawCardClick}>Draw white card</button>
        </div>

        <div className="columns is-multiline">
          {this.state.whiteCards.map((card, index) => (
            <div key={index} className="column is-one-fifth">
              <WhiteCard card={card} onPlayCard={this.handlePlayCard} />
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

interface IStateType {
  whiteCards: string[];
}
