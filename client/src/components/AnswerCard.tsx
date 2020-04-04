import React from 'react';
import AnswerCardType from '../definitions/answer-card';

export default class AnswerCard extends React.Component<PropsType, StateType> {
  handleCardClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
      <div className="cah-card cah-card--answer is-size-4 has-text-weight-bold has-text-black" onClick={this.handleCardClick}>
        {this.props.card.revealed && this.props.card.text}
        {!this.props.card.revealed && <span>Cards Against Humanity</span>}
      </div>
    )
  }
}

interface PropsType {
  card: AnswerCardType;
  onCardClick: (card: AnswerCardType) => void;
}

interface StateType {
  revealed: boolean;
}
