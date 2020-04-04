import BlackCard from './black-card';
import Player from './player';
import AnswerCard from './answer-card';

interface Room {
  id: string;
  blackCards: BlackCard[];
  whiteCards: string[];
  players: Player[];
  currentCard: BlackCard | null;
  answerCards: AnswerCard[];
}

export default Room;
