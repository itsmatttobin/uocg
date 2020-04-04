import BlackCard from './black-card';
import Player from './player';

interface Room {
  blackCards: BlackCard[];
  whiteCards: string[];
  players: Player[];
  currentCard: BlackCard | null;
  playedCards: string[];
}

export default Room;
