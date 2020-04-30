import React from 'react';
import IRoom from '../definitions/room';
import Hand from './Hand';
import CurrentCard from './CurrentCard';
import AnswerCardArea from './AnswerCardArea';

export default class GameArea extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    modalOpen: false,
  };

  componentDidMount = () => {
    // Display warning before leaving / reloading the page
    window.addEventListener('beforeunload', e => {
      e.preventDefault();
      e.returnValue = '';
    });

    // Fix question card to top of screen for mobile when scrolling
    document.addEventListener('scroll', () => {
      if (window.innerWidth < 768) {
        const answerSection = document.querySelector('.answer-card-section');
        const cardSection = document.querySelector('.question-card-section');
        const cardHeight = cardSection && cardSection.getBoundingClientRect().height;

        if (cardSection && cardSection?.getBoundingClientRect().bottom < 75) {
          cardSection?.classList.add('question-card-section--fixed');
          cardSection?.setAttribute('style', `min-height: ${cardHeight}px`);

          const fixedCard = document.querySelector('.question-card-section--fixed .uocg-card');
          const fixedCardHeight = fixedCard && fixedCard.getBoundingClientRect().height;
          answerSection?.setAttribute('style', `padding-top: ${Number(fixedCardHeight) - 55}px`);
        } else {
          cardSection?.classList.remove('question-card-section--fixed');
          cardSection?.removeAttribute('style');
          answerSection?.removeAttribute('style');
        }
      }
    });
  }

  getCurrentPlayerHand = () => {
    const currentPlayer = this.props.room.players.find(player => player.id === this.props.socket.id);
    const hand =  currentPlayer ? currentPlayer.hand : [];
    return hand;
  }

  onHowToPlayClick = () => {
    this.setState({ modalOpen: true });
  }

  onModalCloseClick = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <div className="game-area__header">
          <h3 className="title is-4">Room ID: {this.props.room.id}</h3>
          <span className="rules-link has-text-info is-size-7" onClick={this.onHowToPlayClick}>How to play</span>
        </div>

        <hr/>

        <div className="columns">
          <div className="column is-one-fifth">
            <CurrentCard socket={this.props.socket} room={this.props.room} />
          </div>

          <div className="column is-four-fifths">
            <AnswerCardArea socket={this.props.socket} room={this.props.room} />
          </div>
        </div>

        <hr/>

        <Hand socket={this.props.socket} room={this.props.room} hand={this.getCurrentPlayerHand()} />

        {this.props.connectionError && (
          <div className="connection-error has-text-centered has-background-danger has-text-white">
            <p className="has-text-weight-bold">Connection error!</p>
            <p className="is-size-7">Please refresh and rejoin the room</p>
          </div>
        )}

        <div className={`modal ${this.state.modalOpen ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={this.onModalCloseClick} />
          <div className="modal-content">
            <div className="box">
              <div className="modal-close is-large" onClick={this.onModalCloseClick}>&times;</div>
              <h3 className="title is-3 has-text-centered">How to play</h3>
              <ul>
                <li>- Each player draws 10 cards and must have 10 cards in their hand at all times.</li>
                <li>- Players take it in turns to be the round host, drawing a question card.</li>
                <li>- Each round, other players choose an answer card.</li>
                <li>- The host chooses the best / funniest / most offensive card to win.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface IPropsType {
  socket: SocketIOClient.Socket;
  room: IRoom;
  connectionError: boolean;
}

interface IStateType {
  modalOpen: boolean;
}
