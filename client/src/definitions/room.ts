import BlackCard from './black-card';
import Player from './player';

interface Room {
  blackCards: BlackCard[];
  whiteCards: string[];
  players: Player[];
}

export default Room;
