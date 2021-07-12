import { PTUBasicProps } from "./";
import { QueryTeamProps } from "./queries/team";
import { TeamProps } from "./team";

export interface PureGameProps extends PTUBasicProps {
  game_id: number;
  team_id: number;
  season_id: number;
  season: {
    name: string
  }
  league_id: null | number;
  discipline: string;
  type: string;
  country: string;
  name: string;
  teams_number: number;
  teams_up: number;
  teams_down: number;
  minute_penalty: boolean;
  matchday_number: number;
  first_match: string;
  start_date: string;
  end_date: string;
  preview: number;
  external_source: null | string;
  external_url: null | string;
  external_type: null | string;
  external_id: null | string;
  created_by: number | null;
  deleted_at: null | string;
}

export interface GameProps extends PureGameProps {
  team: TeamProps | null;
}

// For league
export const GameLeagueKeys = [
  "matches",
  "wins",
  "draws",
  "losses",
  "loseGoals",
  "goalDifference",
  "scores",
  "points",
  "position"
] as const;

export type GameStats = {
  team_id: number | null;
  team?: TeamProps
  club_name: string;
  stats: { [key in typeof GameLeagueKeys[number]]: number } & {
    direct_matches_points: number | null,
    direct_matches_goals_difference: number | null
  };
};

export type GameTableProps = {
  goals_made: string;
  goals_lost: string;
  points: string;
  goals_difference: string;
  matches_win: string;
  matches_lose: string;
  matches_draw: string;
  matches_sum: string;
  team: QueryTeamProps
  direct_matches_points: string | null;
  direct_matches_goals_difference: string | null;
};

export interface LeagueGameProps {
  game_id: number;
  team_id: number | null;
  team: TeamProps | null;
  club_name: string;
  game: GameProps;
  crest_url?: string | null
  leagueStats: { [key in typeof GameLeagueKeys[number]]: number };
}
