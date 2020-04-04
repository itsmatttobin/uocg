import React from 'react';
import Room from '../definitions/room';
import Hand from './Hand';
import CurrentCard from './CurrentCard';

export default class GameArea extends React.Component<PropsType> {
  handleShuffleWhiteCardsClick = () => {
    this.props.socket.emit('shuffle white cards', this.props.roomId);
  }

  handleShuffleBlackCardsClick = () => {
    this.props.socket.emit('shuffle black cards', this.props.roomId);
  }

  render() {
    return (
      <div>
        {this.props.room.whiteCards.length > 0 && <button className="button" onClick={this.handleShuffleWhiteCardsClick}>Shuffle white cards</button>}
        {this.props.room.blackCards.length > 0 && <button className="button is-black" onClick={this.handleShuffleBlackCardsClick}>Shuffle black cards</button>}

        <hr/>

        <div className="columns">
          <div className="column is-one-fifth">
            <CurrentCard socket={this.props.socket} roomId={this.props.roomId} room={this.props.room}></CurrentCard>
          </div>
        </div>

        <hr/>

        <Hand socket={this.props.socket} roomId={this.props.roomId} room={this.props.room}></Hand>
      </div>
    )
  }
}

interface PropsType {
  socket: SocketIOClient.Socket;
  roomId: string;
  room: Room;
}
