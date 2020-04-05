import React from 'react';
import IAnswerCardType from '../definitions/answer-card';

export default class AnswerCard extends React.Component<IPropsType> {
  handleCardClick = () => {
    this.props.onCardClick(this.props.card);
  }

  handleChooseCardClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onChooseCardClick(this.props.card);
  }

  render() {
    return (
      <div
        className="uocg-card uocg-card--answer is-size-4 has-text-weight-bold"
        onClick={this.handleCardClick}
      >
        {this.props.card.revealed && (
          <div>
            {this.props.card.text}

            <div className="uocg-card__footer uocg-card__footer--dynamic">
              <div className="button is-info has-text-weight-normal is-fullwidth" onClick={this.handleChooseCardClick}>Choose</div>
            </div>
          </div>
        )}
        {!this.props.card.revealed && <span className="is-size-3">Untitled Offensive Card Game</span>}
      </div>
    );
  }
}

interface IPropsType {
  card: IAnswerCardType;
  onCardClick: (card: IAnswerCardType) => void;
  onChooseCardClick: (card: IAnswerCardType) => void;
}
