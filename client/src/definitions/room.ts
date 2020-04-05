import IBlackCard from './black-card';
import IPlayer from './player';
import IAnswerCard from './answer-card';
import IRoundModal from './round-modal';

interface IRoom {
  id: string;
  blackCards: IBlackCard[];
  whiteCards: string[];
  players: IPlayer[];
  currentCard: IBlackCard | null;
  answerCards: IAnswerCard[];
}

export default IRoom;
