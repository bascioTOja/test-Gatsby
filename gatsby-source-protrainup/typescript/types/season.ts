import { IGatsbyImageData } from "gatsby-plugin-image";

export interface SeasonProps {
  id: number;
  season_id: number;
  team_id: number;
  club_id: null | number;
  parent_season_id: null | number;
  annual: boolean;
  name: string;
  team_name: string;
  start_date: string;
  end_date: string;
  active: boolean;
  image: string | null;
  team_image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  } | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  full_name: string | null;
}
