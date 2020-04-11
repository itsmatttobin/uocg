import React from 'react';
import IPlayer from '../definitions/player';

export default class PlayerList extends React.Component<IPropsType, IStateType> {
  state: IStateType = {
    restartConfirm: false,
  };

  renderPlayer = () => this.props.players && this.props.players.map((player: IPlayer) => (
    <li key={player.id}>
      <div className="columns is-mobile">
        <div className="column is-8">
          {player.name}
        </div>
        <div className="column is-4 has-text-centered">
          {player.wonCards.length}
        </div>
      </div>
    </li>
  ))

  handleRestartGameClick = () => {
    this.setState({ restartConfirm: true });
  }

  handleRestartGameConfirm = () => {
    this.props.onRestartGame();
    this.setState({ restartConfirm: false });
  }

  handleRestartGameCancel = () => {
    this.setState({ restartConfirm: false });
  }

  render() {
    return (
      <div>
        <h3 className="title is-4">Players</h3>
        <div className="columns is-mobile">
          <div className="column">
            <h6 className="title is-6">Name</h6>
          </div>
          <div className="column is-4 has-text-centered">
            <h6 className="title is-6 player-score">Score</h6>
          </div>
        </div>

        <ul>
          {!this.props.players.length && <li>No players</li>}
          {this.renderPlayer()}
        </ul>

        <hr/>

        {!this.state.restartConfirm && (
          <button className="button is-danger is-fullwidth" onClick={this.handleRestartGameClick}>Restart game</button>
        )}

        {this.state.restartConfirm && (
          <div className="columns">
            <div className="column">
              <div className="button is-success is-fullwidth" onClick={this.handleRestartGameConfirm}>Confirm</div>
            </div>
            <div className="column">
              <div className="button is-danger is-fullwidth" onClick={this.handleRestartGameCancel}>Cancel</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

interface IPropsType {
  players: IPlayer[];
  onRestartGame: () => void;
}

interface IStateType {
  restartConfirm: boolean;
}
