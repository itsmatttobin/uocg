import React from 'react';
import IBlackCardType from '../definitions/black-card';

export default class BlackCard extends React.Component<IPropsType> {
  render() {
    return (
      <div className="uocg-card uocg-card--question is-size-5 has-text-weight-bold">
        {this.props.card.text}

        <div className="uocg-card__footer is-size-6">
          {this.props.card.pick > 1 && <span>Pick {this.props.card.pick}</span>}
        </div>
      </div>
    );
  }
}

interface IPropsType {
  card: IBlackCardType;
}
