export interface QueryGameProps {
  id: number;
  team_id: number;
  season_id: number;
  season: {
    name: string
  }
  league_id: number;
  discipline: string;
  type: string;
  country: string;
  name: string;
  teams_number: number;
  teams_up: number;
  teams_down: number;
  minute_penalty: false;
  matchday_number: number;
  first_match: string;
  start_date: string;
  end_date: string;
  preview: number;
  external_source: null | string;
  external_url: null | string;
  external_type: null | string;
  external_id: null | string;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
