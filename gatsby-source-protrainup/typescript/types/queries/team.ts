import { MemberTypes } from "../member";
import { QueryPlayerUserProps } from "./player";
import { QuerySeasonProps } from "./season";

export interface PureQueryTeamProps {
  id: number;
  club_id: number;
  system_club_id: number;
  region_id: null | number;
  type: string;
  discipline: string;
  club_name: string;
  team_name: string;
  age_group: number;
  code: string;
  color: string;
  country: string;
  hidden_at: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  name: string;
}

export interface QueryTeamProps extends PureQueryTeamProps {
  annual_seasons: Array<QuerySeasonProps>;
  system_club: QueryTeamSystemClubProps;
  members: Array<QueryTeamMemberProps>;
}

export interface QueryTeamSystemClubProps {
  id: number;
  country: string;
  discipline: string;
  name: string;
  image: string;
  external_source: string | null;
  external_type: string | null;
  external_id: string | null;
  created_by: null | number;
  created_at: string;
  updated_at: string;
  crest_url: string;
  crest_thumb_url: string;
}

export interface QueryTeamMemberProps {
  id: number;
  team_id: number;
  season_id: number;
  season: QuerySeasonProps | null
  active: boolean;
  user: QueryPlayerUserProps;
  user_id: number;
  type: typeof MemberTypes[number];
  main: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface QueryTeamMemberUserProps {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  confirmed: number;
  last_logged_at: string;
  last_active_at: string;
  contractor_id: null | number;
  settings: {
    invoicing: string;
    currency: string;
  };
  created_by: null | number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  avatar_url: string;
  user_url: string;
  full_name: string | null;
  profile: QueryTeamMemberUserProfileProps;
}

export interface QueryTeamMemberUserProfileProps {
  user_id: number;
  gender: string;
  country: string;
  telephone: string;
  avatar: string;
  birth_date: string;
  disabled_at: null | string;
}
