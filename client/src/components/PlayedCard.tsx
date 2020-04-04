import React from 'react';
import PlayedCardType from '../definitions/played-card';

export default class PlayedCard extends React.Component<PropsType, StateType> {
  handleCardClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
      <div className="cah-card cah-card--played is-size-4 has-text-weight-bold has-text-black" onClick={this.handleCardClick}>
        {this.props.card.revealed && this.props.card.text}
        {!this.props.card.revealed && <span>Cards Against Humanity</span>}
      </div>
    )
  }
}

interface PropsType {
  card: PlayedCardType;
  onCardClick: (card: PlayedCardType) => void;
}

interface StateType {
  revealed: boolean;
}
