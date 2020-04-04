import React from 'react';
import IPlayer from '../definitions/player';

export default class PlayerList extends React.Component<IPropsType> {
  renderPlayer = () => this.props.players && this.props.players.map((player: any) => <li key={player.id}>{player.name}</li>);

  render() {
    return (
      <div>
        <h3 className="title is-4">Players</h3>
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
