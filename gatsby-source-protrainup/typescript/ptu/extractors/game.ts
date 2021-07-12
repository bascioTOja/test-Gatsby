import { GameProps } from "../../types/game";
import { QueryGameProps } from "../../types/queries/game";

const ProcessGames = (games: Array<QueryGameProps>): Array<GameProps> =>
  games.map((game) => ({
    ...game,
    game_id: game.id,
    id: game.id.toString(),
    team: null,
  }));

export default ProcessGames;
