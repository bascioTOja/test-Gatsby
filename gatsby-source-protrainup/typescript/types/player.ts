import { IGatsbyImageData } from "gatsby-plugin-image";
import { PTUBasicProps } from "./";
import { SeasonProps } from "./season";
import { TeamProps } from "./team";

export interface PlayerProps extends PTUBasicProps {
  player_id: number;
  user: UserProps | null;
  season: SeasonProps | null,
  team_id: number;
  team: TeamProps | null;
  season_id: number;
  group_id: number | null;
  number: null | number;
  position: string | null;
  hidden_at: null | string;
  created_by: number;
  deleted_at: null | string;
  match_stats_summary:
    | {
        [key in typeof MatchStats[number]]: number | null;
      }
    | null;
}

export interface UserProps extends PTUBasicProps {
  user_id: number;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  confirmed: number;
  last_logged_at: null | string;
  last_active_at: null | string;
  contractor_id: null | number;
  settings: null;
  created_by: null | number;
  deleted_at: null | string;
  avatar_url: string | null;
  avatar?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData | null
    }
  }
  user_url: string | null;
  full_name: string | null;
  profile: ProfileProps;
  profile_player: ProfilePlayerProps | undefined | null;
}

export type ProfileProps = {
  gender: string;
  country: string;
  telephone: string;
  avatar: string;
  birth_date: string;
  disabled_at: null | string;
};

export type ProfilePlayerProps = {
  user_id: number;
  leg: null | string;
  hand: null | string;
  license_number: string;
};

export const MatchStats = [
  "matches",
  "red_cards",
  "yellow_cards",
  "scores",
  "assists",
  "minutes",
] as const;

export const DefenderPositions = [
  "back-left-offensive",
  "back-left",
  "centre-back",
  "back-right",
  "back-right-offensive",
] as const;

export const MidfielderPositions = [
  "winger-left",
  "centre-midfield-left",
  "defensive-midfield",
  "centre-midfield",
  "centre-midfield-right",
  "winger-right",
] as const;

export const ForwardPositions = [
  "winger-left-offensive",
  "attacking-midfield-left",
  "attacking-midfield",
  "centre-forward",
  "attacking-midfield-right",
  "winger-right-offensive",
] as const;
