import BlackCard from './black-card';
import Player from './player';
import PlayedCard from './played-card';

interface Room {
  blackCards: BlackCard[];
  whiteCards: string[];
  players: Player[];
  currentCard: BlackCard | null;
  playedCards: PlayedCard[];
}

export default Room;
