import { IGatsbyImageData } from "gatsby-plugin-image";
import { PTUBasicProps } from "./";

export interface SystemClubProps extends PTUBasicProps {
  system_club_id: number;
  country: string;
  discipline: string;
  name: string;
  image: string;
  external_source: string | null;
  external_type: string | null;
  external_id: string | null;
  created_by: null | number;
  crest_url: string;
  crest_thumb_url: string | null;
  crest?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData | null
    };
  };
}
