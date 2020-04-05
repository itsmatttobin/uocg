import React from 'react';
import IAnswerCardType from '../definitions/answer-card';

export default class AnswerCard extends React.Component<IPropsType> {
  handleCardClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
      <div
        className="uocg-card uocg-card--answer is-size-4 has-text-weight-bold"
        onClick={this.handleCardClick}
      >
        {this.props.card.revealed && this.props.card.text}
        {!this.props.card.revealed && <span className="is-size-3">Untitled Offensive Card Game</span>}
      </div>
    );
  }
}

interface IPropsType {
  card: IAnswerCardType;
  onCardClick: (card: IAnswerCardType) => void;
}
