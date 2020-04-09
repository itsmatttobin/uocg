import React from 'react';

export default class WhiteCard extends React.Component<IPropsType> {
  handlePlayCardClick = () => {
    this.props.onPlayCard(this.props.card);
  }

  render() {
    return (
      <div className="uocg-card is-size-4 has-text-weight-bold">
        {this.props.card}

        {this.props.isPlayable && (
          <div className="uocg-card__footer uocg-card__footer--dynamic">
            <div className="button is-info has-text-weight-normal is-fullwidth" onClick={this.handlePlayCardClick}>Play</div>
          </div>
        )}
      </div>
    );
  }
}

interface IPropsType {
  card: string;
  isPlayable: boolean;
  onPlayCard: (card: string) => void;
}
