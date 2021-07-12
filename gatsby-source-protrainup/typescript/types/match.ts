import { FixedObject } from "gatsby-image";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { PTUBasicProps } from "./";
import { GameProps } from "./game";
import { PlayerProps } from "./player";
import { SeasonProps } from "./season";
import { TeamProps } from "./team";

export interface MatchProps extends PTUBasicProps {
  match_id: number;
  season: SeasonProps | null
  team_id: number;
  team?: TeamProps | null;
  season_id: number;
  game_id: number | null;
  game: GameProps | null;
  discipline: string;
  type: typeof MatchTypeNames[number];
  name: string;
  place: string | null;
  location_address: boolean;
  sub_facility_id: number | null;
  match_day: number | null;
  round: null | string;
  date: string;
  own_team: 0 | 1 | 2;
  game_team_1_id: null | number;
  game_team_2_id: null | number;
  result_team_1: number | null;
  result_team_2: number | null;
  first_squad_players_number: number;
  match_time: number;
  parts: 0 | 1 | 2;
  minute_penalty: boolean;
  description: string | null;
  review: null | string;
  report: null | string;
  video_url: null | string;
  external_source: null | string;
  external_type: null | string;
  external_id: null | string;
  match_views: null | number;
  match_published_at: null | string;
  squad_views: number | null;
  squad_published_at: string | null;
  sync_personal_stats: boolean;
  notified_at: null | string;
  created_by: number;

  // Added manually
  is_future: boolean;
  guest_name: string | null;
  host_name: string | null;
  host_stats: StatsProps | null;
  guest_stats: StatsProps | null;
  host_crest?: {
    url: string | null;
    childImageSharp: {
      fixed: FixedObject | null;
      gatsbyImageData: IGatsbyImageData | null;
    };
  };
  guest_crest?: {
    url: string | null;
    childImageSharp: {
      fixed: FixedObject | null;
      gatsbyImageData: IGatsbyImageData | null;
    };
  };
  host_crest_url: string | null;
  guest_crest_url: string | null;
  representation: TeamProps | null;
}

export type StatsProps = {
  [key in typeof StatTypes[number]]: string | number | boolean | null;
};

export interface ParticipantProps extends PTUBasicProps {
  participant_id: number;
  match_id: number;
  match: MatchProps | null;
  match_team_id: number;
  host: boolean;
  result: number | null;
}

export interface MatchPlayerProps extends PTUBasicProps {
  match_player_id: number;
  match_id: number;
  match_participant_id: number;
  player: PlayerProps | null;
  player_id: number | null;
  player_name: null | string;
  stats: StatsProps;
}

export interface MatchEventProps {
  id: string;
  event_id: number;
  match_participant_id: number;
  participant_match: ParticipantProps;
  player_id: number;
  player: MatchPlayerProps | null;
  part: number;
  minute: number;
  type: typeof MatchEventTypes[number];
  details: string | null;
  second_player_id: number | null;
  match_id: number;
  match: MatchProps | null;
}

export const MatchEventTypes = [
  "defense",
  "red_card",
  "score",
  "substitution",
  "technical_foul",
  "throw",
  "yellow_card",
] as const;

export const MatchTypeNames = ["cup", "friendly", "league", "other"] as const;

export const StatTypes = [
  "active_game",
  "first_squad",
  "ball_losses",
  "assists",
  "minutes",
  "corners",
  "field_possession_attack",
  "defenses",
  "field_possession_center",
  "field_possession_defense",
  "formation",
  "fouls",
  "free_kicks",
  "minute_penalties",
  "inaccurate_passes",
  "offsides",
  "outs",
  "passes",
  "possession",
  "penalties",
  "red_cards",
  "scores",
  "shoots",
  "shoots_ongoal",
  "successful_pressings",
  "substitutions",
  "tagging",
  "tackles",
  "technical_fouls",
  "throws",
  "unsuccessful_pressings",
  "yellow_cards",
] as const;
