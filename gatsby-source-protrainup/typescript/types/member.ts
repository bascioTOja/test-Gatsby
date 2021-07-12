import { UserProps } from "./player";
import { TeamProps } from "./team";
import { PTUBasicProps } from "./";
import { SeasonProps } from "./season";

export const MemberTypes = ["assistant", "coach", "physical coach"] as const;

export interface MemberProps extends PTUBasicProps {
  member_id: number;
  team_id: number;
  team: TeamProps | null;
  season_id: number;
  season: SeasonProps | null;
  active: boolean;
  user_id: number;
  user: UserProps | null;
  main: boolean;
  created_by: number;
  deleted_at: null | string;
  type: typeof MemberTypes[number];
}
