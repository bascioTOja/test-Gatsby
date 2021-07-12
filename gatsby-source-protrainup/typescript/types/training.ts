import { PTUBasicProps } from "./";
import { UserProps } from "./player";
import { TeamProps } from "./team";

export interface TrainingProps extends PTUBasicProps {
  id: string;
  training_id: number;
  team_id: number;
  season_id: number;
  date: string;
  hour: string;
  type: string;
  duration_mode: null | string;
  duration_time: null | number;
  cancelled: boolean;
  training_schedule_id: number;
  training_period_id: null | number;
  training_no: number;
  title: string;
  location: string;
  location_address: boolean;
  sub_facility_id: null | number;
  description: string;
  comments: string;
  creator_id: number,
  created_by?: UserProps;
  created_at: string;
  updated_at: string;
  team: TeamProps | null;
  staff: Array<StaffProps>
}

export interface StaffProps {
    role: typeof StaffTypes[number],
    full_name: string;
}


export const StaffTypes = [
  "assistant",
  "coach",
  "first coach",
  "observer",
] as const;

