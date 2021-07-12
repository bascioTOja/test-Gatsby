import { MatchStatsSummaryProps } from "../../types";
import { MatchStats, PlayerProps, UserProps } from "../../types/player";
import { QueryPlayerProps } from "../../types/queries/player";

type ExtractedQueryProps = {
  players: Array<PlayerProps>;
  users: Array<UserProps>;
};

const ExtractPlayers = (
  players: Array<QueryPlayerProps>
): ExtractedQueryProps => {
  const users: Array<UserProps> = [];

  players.forEach((player) => {
    if (player.user) {
      users.push({
        ...player.user,
        id: player.user.id.toString(),
        user_id: player.user_id,
        avatar: undefined,
      });
    }
  });

  const extractedPlayers: Array<PlayerProps> = players.map((player) => {
    if (player.user) {
      delete player["user"];
      delete player["match_stats"];
    }

    const playerStats: {
      [key in typeof MatchStatsSummaryProps[number]]: number;
    } = {} as { [key in typeof MatchStatsSummaryProps[number]]: number };

    if (player.match_stats_summary) {
      Object.keys(player.match_stats_summary).forEach((key) => {
        if (MatchStats.some((stat) => stat === key)) {
          playerStats[
            key as typeof MatchStatsSummaryProps[number]
          ] = player.match_stats_summary[
            key as typeof MatchStatsSummaryProps[number]
          ].valueOf() as number;
        }
      });
    }

    return {
      ...player,
      id: player.id.toString(),
      player_id: player.id,
      user: null,
      team: null,
      season: null,
      match_stats_summary:
        Object.keys(playerStats).length > 0 ? playerStats : null,
    };
  });

  return { players: extractedPlayers, users: users };
};

export default ExtractPlayers;
