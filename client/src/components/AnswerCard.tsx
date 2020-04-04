import React from 'react';
import IAnswerCardType from '../definitions/answer-card';

export default class AnswerCard extends React.Component<IPropsType> {
  handleCardClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
      <div
        className="cah-card cah-card--answer is-size-4 has-text-weight-bold has-text-black"
        onClick={this.handleCardClick}
      >
        {this.props.card.revealed && this.props.card.text}
        {!this.props.card.revealed && <span>Cards Against Humanity</span>}
      </div>
    );
  }
}

interface IPropsType {
  card: IAnswerCardType;
  onCardClick: (card: IAnswerCardType) => void;
}
