import BlackCard from "./black-card";

interface Player {
  id: string;
  name: string;
  hand: string[];
  wonCards: BlackCard[];
}

export default Player;
