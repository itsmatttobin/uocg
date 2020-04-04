import React from 'react';

export default class WhiteCard extends React.Component<PropsType> {
  handlePlayCardClick = () => {
    this.props.onPlayCard(this.props.card);
  }

  render() {
    return (
      <div className="cah-card is-size-4 has-text-weight-bold has-text-black">
        {this.props.card}

        <div className="cah-card__footer cah-card__footer--dynamic">
          <div className="button is-black has-text-weight-normal is-fullwidth" onClick={this.handlePlayCardClick}>Play</div>
        </div>
      </div>
    )
  }
}

interface PropsType {
  card: string;
  onPlayCard: (card: string) => void;
}
