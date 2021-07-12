// To create fetching all leagues, create collection for it
import {
  GameProps,
  GameStats,
  GameTableProps,
  LeagueGameProps,
} from "../../types/game";
import { QueryMatchProps } from "../../types/queries/match";
import { AxiosInstance } from "axios";

interface PureLeagueTeamProps {
  [team_id: string]: GameStats;
}

type LeagueProps = {
  [game_id: string]: PureLeagueTeamProps;
};

const createEmptyStats = (): GameStats => ({
  team_id: null,
  club_name: "",
  stats: {
    position: 10,
    scores: 0,
    matches: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    loseGoals: 0,
    goalDifference: 0,
    points: 0,
    direct_matches_goals_difference: null,
    direct_matches_points: null,
  },
});

class LeagueCreator {
  #leagues: LeagueProps = {};

  processMatch = (match: QueryMatchProps) => {
    if (
      match.game &&
      match.participants &&
      match.own_team > 0 &&
      match.game_id
    ) {
      !(match.game_id in this.#leagues) && (this.#leagues[match.game_id] = {});
      const currentLeague = this.#leagues[match.game_id];

      const host = match.participants
        ? match.participants.find((participant) => participant.host === true)
        : null;

      const guest = match.participants
        ? match.participants.find((participant) => participant.host === false)
        : null;

      // Create object if not exist
      if (guest && host && host.match_team && guest.match_team) {
        !(guest.match_team_id in currentLeague) &&
          (currentLeague[guest.match_team_id] = createEmptyStats());
        !(host.match_team_id in currentLeague) &&
          (currentLeague[host.match_team_id] = createEmptyStats());

        const hostInLeague = currentLeague[host.match_team_id];
        const guestInLeague = currentLeague[guest.match_team_id];

        hostInLeague.club_name = host.match_team.name;
        guestInLeague.club_name = guest.match_team.name;

        if (match.own_team === 1) {
          hostInLeague.team_id = match.team_id;
        } else if (match.own_team === 2) {
          guestInLeague.team_id = match.team_id;
        }
      }
    }
  };

  getLeagues = async (
    axiosInstance: AxiosInstance
  ): Promise<Array<LeagueGameProps>> => {
    const leagueTeams: Array<LeagueGameProps> = [];
    const gamesId = Object.keys(this.#leagues);

    axiosInstance;
    await Promise.all(
      gamesId.map(async (gameId) => {
        const { data: apiTableData } = await axiosInstance.get<
          Array<GameTableProps>
        >(`/diary/games/${gameId}/table`);

        const league = this.#leagues[gameId];
        if (league) {
          Object.keys(league).forEach((teamId) => {
            const teamInApiIndex = apiTableData.findIndex(
              (team) => team.team.name === league[teamId].club_name
            );

            const table = apiTableData[teamInApiIndex];

            league[teamId].stats.matches = +table.matches_sum;
            league[teamId].stats.wins = +table.matches_win;
            league[teamId].stats.draws = +table.matches_draw;
            league[teamId].stats.losses = +table.matches_lose;
            league[teamId].stats.loseGoals = +table.goals_lost;
            league[teamId].stats.goalDifference = +table.goals_difference;
            league[teamId].stats.scores = +table.goals_made;
            league[teamId].stats.points = +table.points;
            league[teamId].stats.position = teamInApiIndex + 1;

            if (table.direct_matches_goals_difference) {
              league[
                teamId
              ].stats.direct_matches_goals_difference = +table.direct_matches_goals_difference;
            }

            if (table.direct_matches_points) {
              league[
                teamId
              ].stats.direct_matches_points = +table.direct_matches_points;
            }

            leagueTeams.push({
              club_name: league[teamId].club_name,
              team: null,
              team_id: league[teamId].team_id,
              crest_url:
                apiTableData[teamInApiIndex].team.system_club.crest_thumb_url,
              game: {} as GameProps,
              game_id: +gameId,
              leagueStats: league[teamId].stats,
            });
          });
        }
      })
    );

    return leagueTeams;
  };
}

const leagueCreator = new LeagueCreator();

export default leagueCreator;
