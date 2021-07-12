import { MatchEventProps, MatchEventTypes } from "./match";

// Common

export interface PTUBasicProps {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface EventProps {
  oid: number;
  title: string;
  start: string;
  end: string;
  editable: boolean;
  allDay: boolean;
  className: string;
  type: string;
  color: string;
  location: string;
  gathering_date: null | string;
  team_name: string;
  badge_color: string;
  uri: string;
}

export interface QueryCommonSystemClubProps {
  id: number;
  country: string;
  discipline: string;
  name: string;
  image: string;
  external_source: string;
  external_type: string;
  external_id: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  crest_url: string;
  crest_thumb_url: string;
}

export type ParticipantStatsProps = {
  [key in typeof MatchEventTypes[number]]: Array<MatchEventProps>;
};

export const MatchStatsSummaryProps = [
  "first_squad",
  "substitute",
  "on_field",
  "position",
  "contusion",
  "minutes",
  "scores",
  "assists",
  "yellow_cards",
  "red_cards",
  "minute_penalties",
  "minute_penalties_sum",
  "rate",
  "pluses",
  "minuses",
  "field_position",
  "field_position_arrow",
  "matches",
] as const