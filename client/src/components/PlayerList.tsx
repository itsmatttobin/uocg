import React from 'react';
import IPlayer from '../definitions/player';

export default class PlayerList extends React.Component<IPropsType> {
  renderPlayer = () => this.props.players && this.props.players.map((player: IPlayer) => (
    <li key={player.id}>
      <div className="columns">
        <div className="column">
          {player.name}
        </div>
        <div className="column is-4 has-text-centered">
          {player.wonCards.length}
        </div>
      </div>
    </li>
  ))

  render() {
    return (
      <div>
        <h3 className="title is-4">Players</h3>
        <div className="columns">
          <div className="column">
            <h6 className="title is-6">Name</h6>
          </div>
          <div className="column is-4 has-text-centered">
            <h6 className="title is-6">Score</h6>
          </div>
        </div>

        <ul>
          {!this.props.players.length && <li>No players</li>}
          {this.renderPlayer()}
        </ul>
      </div>
    );
  }
}

interface IPropsType {
  players: IPlayer[];
}
