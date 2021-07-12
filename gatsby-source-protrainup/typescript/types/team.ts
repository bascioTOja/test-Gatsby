import { MemberProps } from "./member";
import { PTUBasicProps } from "./";
import { SystemClubProps } from "./systemClub";
import { SeasonProps } from "./season";

// Pure is without relations
export interface PureTeamProps extends PTUBasicProps {
  team_id: number;
  club_id: number;
  slug: string;
  system_club_id: number;
  region_id: number | null;
  type: string;
  discipline: string;
  club_name: string;
  team_name: string;
  age_group: number;
  code: string;
  color: string;
  country: string | null;
  hidden_at: string;
  created_by: number;
  deleted_at: string | null;
  name: string;
}

export interface TeamProps extends PureTeamProps {
  system_club: SystemClubProps | null;
  annual_seasons: Array<{
    season_id: number
    season: SeasonProps | null
  }>;
  members: Array<MemberProps> | null;
  main_coach: MemberProps | null;
  main_coach_id: number | null;
}
