import { StaffTypes } from "../training";
import { QueryPlayerUserProps } from "./player";
import { PureQueryTeamProps } from "./team";

export interface QueryTrainingProps {
  id: number;
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
  topic: string;
  location: string;
  location_address: boolean;
  sub_facility_id: null | number;
  description: string;
  comments: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  team?: PureQueryTeamProps;
  staff?: Array<QueryTrainingStaffProps>;
  sub_facility?: QueryTrainingSubFacilityProps | null;
}

export interface QueryTrainingStaffProps {
  id: string;
  training_id: string;
  user_id: string;
  role: typeof StaffTypes[number];
  created_at: string;
  updated_at: string;
  user: QueryPlayerUserProps | null;
  facility: QueryTrainingFacilityProps | null
}

export interface QueryTrainingFacilityProps {
  id: number;
  club_id: number;
  address_id: number;
  contact_member_id: number;
  own_facility: boolean;
  name: string;
  description: string
  type: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  full_name: string | null;
}

export interface QueryTrainingSubFacilityProps {
  id: number;
  facility_id: number;
  address_id: null | number;
  parent_id: null | number;
  name: string;
  description: string;
  type: string;
  participants_limit: number;
  trainings: boolean;
  matches: boolean;
  licenced: boolean;
  can_be_reserved: boolean;
  reservation_min_time: null;
  reservation_max_time: null;
  reservation_step_time: null;
  currency_iso: null | string;
  image: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  image_url: string;
  short_name: string;
}
