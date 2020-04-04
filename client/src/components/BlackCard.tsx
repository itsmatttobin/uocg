import React from 'react';
import BlackCardType from '../definitions/black-card';

export default class BlackCard extends React.Component<PropsType> {
  render() {
    return (
      <div className="cah-card cah-card--black is-size-5 has-text-weight-bold">
        {this.props.card.text}

        <div className="cah-card__footer is-size-6">
          {this.props.card.pick > 1 && <span>Pick {this.props.card.pick}</span>}
        </div>
      </div>
    )
  }
}

interface PropsType {
  card: BlackCardType;
}
