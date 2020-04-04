import React from 'react';
import Player from '../definitions/player';

export default class PlayerList extends React.Component<PropsType> {
  renderPlayer = () => {
    return this.props.players && this.props.players.map((player: any) => <li key={player.id}>{player.name}</li>);
  }

  render() {
    return (
      <div>
        <h3 className="title is-5">Players</h3>
          <ul>
            {!this.props.players.length && <li>No players</li>}
            {this.renderPlayer()}
          </ul>
      </div>
    );
  }
}

interface PropsType {
  players: Player[]
}
