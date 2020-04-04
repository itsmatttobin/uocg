import React from 'react';

export default class Hand extends React.Component<PropsType> {
  render() {
    return (
      <div className="cah-card is-size-4 has-text-weight-bold has-text-black">
        {this.props.text}

        <div className="cah-card__footer cah-card__footer--dynamic">
          <div className="button is-black has-text-weight-normal is-fullwidth">Play</div>
        </div>
      </div>
    )
  }
}

interface PropsType {
  text: string;
}
