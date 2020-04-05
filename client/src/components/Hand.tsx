import React from 'react';
import IRoom from '../definitions/room';
import WhiteCard from './WhiteCard';
import EVENTS from '../definitions/events';

export default class Hand extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    whiteCards: [],
  };

  componentDidMount = () => {
    this.props.socket.on(EVENTS.GAME_RESTARTED, () => {
      this.setState({ whiteCards: [] });
    });
  }

  handleDrawCardClick = () => {
    if (this.state.whiteCards.length < 10) {
      this.setState({ whiteCards: [...this.state.whiteCards, this.props.room.whiteCards[0]] });
      this.props.socket.emit(EVENTS.DRAW_WHITE_CARD, this.props.roomId);
    }
  }

  handlePlayCard = (card: string) => {
    const hand = [...this.state.whiteCards];
    const index = hand.indexOf(card);
    hand.splice(index, 1);

    this.setState({ whiteCards: hand }, () => {
      this.props.socket.emit(EVENTS.PLAY_CARD, this.props.roomId, card);
    });
  }

  isDrawCardDisabled = () => this.state.whiteCards.length === 10;

  render() {
    return (
      <div>
        <h3 className="title is-4">Your hand</h3>

        <div className="button-section">
          <button className="button" onClick={this.handleDrawCardClick} disabled={this.isDrawCardDisabled()}>Draw answer card</button>
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
