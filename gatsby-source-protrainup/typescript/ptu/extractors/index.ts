import { AxiosResultProps } from "..";
import ExtractMatches from "./match";
import ExtractTeams from "./team";
import ExtractGames from "./game";
import ExtractPlayerData from "./player";
import ExtractTrainingData from "./training";
import {
  MatchEventProps,
  MatchPlayerProps,
  MatchProps,
  ParticipantProps,
} from "../../types/match";
import { EventProps } from "../../types";
import { GameProps, LeagueGameProps } from "../../types/game";
import { PlayerProps, UserProps } from "../../types/player";
import { TeamProps } from "../../types/team";
import { SystemClubProps } from "../../types/systemClub";
import { MemberProps } from "../../types/member";
import { TrainingProps } from "../../types/training";
import { AxiosInstance } from "axios";
import { SeasonProps } from "../../types/season";

export type MainQueriesExtractorProps = {
  events: Array<EventProps>;
  matches: Array<MatchProps>;
  participants: Array<ParticipantProps>;
  matchPlayers: Array<MatchPlayerProps>;
  matchEvents: Array<MatchEventProps>;
  games: Array<GameProps>;
  users: Array<UserProps>;
  players: Array<PlayerProps>;
  teams: Array<TeamProps>;
  systemClubs: Array<SystemClubProps>;
  members: Array<MemberProps>;
  trainings: Array<TrainingProps>;
  leagues: Array<LeagueGameProps>;
  seasons: Array<SeasonProps>;
};

const ExtractAll = async (
  axiosGetResults: AxiosResultProps,
  axiosInstance: AxiosInstance
): Promise<MainQueriesExtractorProps> => {
  const matchesData = await ExtractMatches(
    axiosGetResults.matchesQueryData,
    axiosInstance
  );
  const games = ExtractGames(axiosGetResults.gamesQueryData);
  const playersData = ExtractPlayerData(axiosGetResults.playersQueryData);
  const teamsData = ExtractTeams(axiosGetResults.teamQueryData);
  const trainingsData = ExtractTrainingData(axiosGetResults.trainingsData);

  const users = [
    ...playersData.users,
    ...trainingsData.users,
    ...matchesData.users,
  ];
  teamsData.users != null && users.push(...teamsData.users);

  matchesData.players.push(...playersData.players);
  // delete teamsData["users"], playersData["users"], trainingsData["users"];

  return {
    ...matchesData,
    ...playersData,
    ...teamsData,
    ...trainingsData,
    events: axiosGetResults.eventsData,
    games,
    users,
  };
};

export default ExtractAll;
