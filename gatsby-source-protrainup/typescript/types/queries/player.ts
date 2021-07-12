import { MatchStatsSummaryProps } from "../";
import { ProfilePlayerProps, ProfileProps } from "../player";
import { QuerySeasonProps } from "./season";

export interface QueryPlayerProps {
  id: number;
  user?: QueryPlayerUserProps | null;
  user_id: number;
  team_id: number;
  season_id: number;
  season: QuerySeasonProps;
  group_id: null | number;
  number: null | number;
  position: null | string;
  hidden_at: null | string;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match_stats?: any;
  match_stats_summary: {
    [key in typeof MatchStatsSummaryProps[number]]: string | number | boolean;
  };
}

export interface QueryPlayerUserProps {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: null | string;
  confirmed: number;
  last_logged_at: null | string;
  last_active_at: null | string;
  contractor_id: null | number;
  settings: null;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  avatar_url: string;
  user_url: string;
  full_name: string | null;
  profile: ProfileProps;
  profile_player: ProfilePlayerProps | undefined | null;
}
