import React from 'react';
import Room from '../definitions/room';
import WhiteCard from './WhiteCard';

export default class Hand extends React.Component<PropsType, StateType> {
  state: StateType = {
    whiteCards: [],
  }

  handleDrawCardClick = () => {
    if (this.state.whiteCards.length < 10) {
      this.setState({ whiteCards: [...this.state.whiteCards, this.props.room.whiteCards[0]] })
      this.props.socket.emit('draw white card', this.props.roomId);
    }
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Your hand</h3>

        <div className="button-section">
          <button className="button" onClick={this.handleDrawCardClick}>Draw white card</button>
        </div>

        <div className="columns is-multiline">
          {this.state.whiteCards.map(card =>
            <div className="column is-one-fifth">
              <WhiteCard text={card}></WhiteCard>
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

interface StateType {
  whiteCards: string[];
}
