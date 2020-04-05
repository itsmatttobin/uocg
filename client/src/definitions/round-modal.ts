import IBlackCard from './black-card';
import IPlayer from './player';
import IAnswerCard from './answer-card';

interface IRoundModal {
  open: boolean;
  player: IPlayer | null;
  question: IBlackCard | null;
  answer: IAnswerCard | null;
}

export default IRoundModal;
