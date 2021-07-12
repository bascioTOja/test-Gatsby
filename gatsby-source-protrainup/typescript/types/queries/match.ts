import { QueryCommonSystemClubProps } from "../";
import { MatchEventTypes, MatchTypeNames, StatTypes } from "../match";
import { QueryGameProps } from "./game";
import { QueryPlayerProps } from "./player";

export interface QueryMatchProps {
  id: number;
  team_id: number;
  season: {
    name: string
  }
  season_id: number;
  game_id: null | number;
  game?: QueryGameProps | null;
  discipline: string;
  type: typeof MatchTypeNames[number];
  name: string;
  place: null | string;
  location_address: boolean;
  sub_facility_id: number | null;
  match_day: null | number;
  round: null | string;
  date: string;
  hour?: string;
  own_team: 0 | 1 | 2;
  game_team_1_id: null | number;
  game_team_2_id: null | number;
  result_team_1: null | number;
  result_team_2: null | number;
  first_squad_players_number: number;
  match_time: number;
  extra_time: null | number;
  parts: 0 | 1 | 2;
  minute_penalty: boolean;
  description: null | string;
  review: null | string;
  report: null | string;
  video_url: null | string;
  external_source: null | string;
  external_type: null | string;
  external_id: null | string;
  match_views: null | number;
  match_published_at: null | string;
  squad_views: null | number;
  squad_published_at: null | string;
  sync_personal_stats: boolean;
  notified_at: null | string;
  created_by: number;
  created_at: string;
  updated_at: string;
  participants?: Array<QueryMatchParticipantProps>;
  events?: Array<QueryMatchEventProps>;
  match_players?: Array<QueryMatchPlayerProps>;
}

export interface QueryMatchParticipantProps {
  id: number;
  match_id: number;
  match_team_id: number;
  host: boolean;
  result: null | number;
  created_at: string;
  updated_at: string;
  stats?: Array<QueryMatchParticipantStatProps>;
  match_team?: QueryMatchParticipantTeam;
}

export interface QueryParticipantStatMatch extends QueryMatchParticipantProps {
  match: QueryMatchProps;
}

export interface QueryMatchParticipantStatProps {
  id: number;
  match_participant_id: number;
  name: typeof StatTypes[number];
  value: string | boolean | number;
  match_participant: QueryParticipantStatMatch;
}

export interface QueryMatchEventProps {
  id: number;
  match_participant_id: number;
  match_player_id: number;
  part: number;
  minute: number;
  type: typeof MatchEventTypes[number];
  details: string;
  second_match_player_id: null | number;
  laravel_through_key: number;
}

export interface QueryMatchPlayerProps {
  id: number;
  match_id: number;
  match_participant_id: number;
  player_id: number;
  player: QueryPlayerProps | null;
  player_name: null | string;
  created_at: string;
  updated_at: string;
  stats: Array<QueryMatchPlayerStatProps>;
}

export interface QueryMatchPlayerStatProps {
  id: number;
  match_player_id: number;
  name: typeof StatTypes[number];
  value: boolean | string | number;
}

export interface QueryMatchParticipantTeam {
  id: number;
  game_id: number;
  system_club_id: number;
  system_club_team_id: null | number;
  own: boolean;
  name: string;
  image: null | string;
  system_club_team: null;
  system_club: QueryCommonSystemClubProps;
}
