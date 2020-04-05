import IBlackCard from './black-card';

interface IPlayer {
  id: string;
  name: string;
  wonCards: IBlackCard[];
}

export default IPlayer;
