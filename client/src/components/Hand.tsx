import React from 'react';
import IRoom from '../definitions/room';
import WhiteCard from './WhiteCard';
import EVENTS from '../definitions/events';

export default class Hand extends React.Component<IPropsType> {
  handleDrawCardClick = () => {
    if (this.props.hand.length < 10) {
      this.props.socket.emit(EVENTS.DRAW_WHITE_CARD, this.props.room.id, this.props.socket.id);
    }
  }

  handlePlayCard = (card: string) => {
    if (this.props.room.currentCard) {
      this.props.socket.emit(EVENTS.PLAY_CARD, this.props.room.id, card, this.props.socket.id);
    }
  }

  isDrawCardDisabled = () => this.props.hand.length === 10 || !this.props.room.whiteCards.length;

  hasQuestionCard = () => !!this.props.room.currentCard;

  playerHasPlayedCards = () => {
    const playedCards = this.props.room.answerCards.filter(card => card.playerId === this.props.socket.id);
    return playedCards.length >= Number(this.props.room.currentCard?.pick);
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Your hand</h3>

        <div className="columns">
          <div className="column is-one-fifth">
            <button className="button is-fullwidth" onClick={this.handleDrawCardClick} disabled={this.isDrawCardDisabled()}>
              Draw answer card
            </button>
            {!this.props.room.whiteCards.length && (
              <div className="has-text-grey-light has-text-centered cards-remaining">No answer cards remaining!</div>
            )}
          </div>
        </div>

        <div className={`card-row__container ${this.props.hand.length ? 'card-row__container--has-cards' : ''}`}>
          <div className="columns is-multiline card-row">
            {this.props.hand.map((card, index) => (
              <div key={index} className="column is-one-fifth">
                <WhiteCard
                  card={card}
                  isPlayable={this.hasQuestionCard() && !this.playerHasPlayedCards()}
                  onPlayCard={this.handlePlayCard}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="is-size-6 has-text-grey-light hand-tip">
          After a question card has been drawn, hover over a card and click 'Play' to play that card.
        </div>
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  room: IRoom;
  hand: string[];
}
