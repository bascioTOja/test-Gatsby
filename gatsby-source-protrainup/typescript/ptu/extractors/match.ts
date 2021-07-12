import moment from "moment";
import {
  QueryMatchEventProps,
  QueryMatchParticipantProps,
  QueryMatchPlayerProps,
  QueryMatchProps,
} from "../../types/queries/match";
import {
  MatchEventProps,
  MatchPlayerProps,
  MatchProps,
  ParticipantProps,
  StatsProps,
  StatTypes,
} from "../../types/match";
import {
  QueryPlayerProps,
  QueryPlayerUserProps,
} from "../../types/queries/player";
import { PlayerProps, UserProps } from "../../types/player";
import leagueCreator from "../leagueCreator";
import { LeagueGameProps } from "../../types/game";
import { AxiosInstance } from "axios";

type ExtractedQueryProps = {
  matches: Array<MatchProps>;
  participants: Array<ParticipantProps>;
  matchPlayers: Array<MatchPlayerProps>;
  matchEvents: Array<MatchEventProps>;
  players: Array<PlayerProps>;
  users: Array<UserProps>;
  leagues: Array<LeagueGameProps>;
};

type ExtractedMatchProps = {
  match: MatchProps;
  participants: Array<QueryMatchParticipantProps>;
  matchPlayers: Array<QueryMatchPlayerProps>;
  matchEvents: Array<QueryMatchEventProps>;
  players: Array<QueryPlayerProps>;
  users: Array<QueryPlayerUserProps>;
};

const extractMatchData = (match: QueryMatchProps): ExtractedMatchProps => {
  const result: ExtractedMatchProps = {
    participants: match.participants ? match.participants : [],
    matchPlayers: match.match_players ? match.match_players : [],
    matchEvents: match.events ? match.events : [],
    players: [],
    users: [],
    match: {} as MatchProps,
  };

  match.match_players &&
    match.match_players.forEach((player) => {
      if (player.player) {
        delete player.player["match_stats"];
        result.players.push(player.player);
        if (player.player.user) {
          result.users.push(player.player.user);
        }
      }
    });

  const host = match.participants
    ? match.participants.find((participant) => participant.host === true)
    : null;
  const guest = match.participants
    ? match.participants.find((participant) => participant.host === false)
    : null;

  if (match.hour) {
    const splitedHour = match.hour.split(":");
    const timeInSeconds =
      parseInt(splitedHour[0]) * 3600 + parseInt(splitedHour[1]) * 60;
    match.date = moment(match.date)
      .add(timeInSeconds, "seconds")
      .format("YYYY-MM-DD HH:mm:ss");
    delete match["hour"];
  }

  guest && (match.result_team_2 = guest.result);
  host && (match.result_team_1 = host.result);

  delete match["events"];
  delete match["game"];
  delete match["match_players"];
  delete match["participants"];

  const hostStats: StatsProps = {} as StatsProps;
  const guestStats: StatsProps = {} as StatsProps;

  if (host && host.stats) {
    host.stats.forEach((stat) => {
      hostStats[stat.name as typeof StatTypes[number]] = stat.value.toString();
    });
    delete host["stats"];
  }

  if (guest && guest.stats) {
    guest.stats.forEach((stat) => {
      guestStats[stat.name as typeof StatTypes[number]] = stat.value.toString();
    });
    delete guest["stats"];
  }

  result.match = {
    ...match,
    match_id: match.id,
    id: match.id.toString(),
    team: null,
    season: null,
    guest_name: guest && guest.match_team ? guest.match_team.name : "",
    host_name: host && host.match_team ? host.match_team.name : "",
    is_future: moment().isSameOrBefore(match.date),
    game: null,
    host_stats: Object.keys(hostStats).length > 0 ? hostStats : null,
    guest_stats: Object.keys(guestStats).length > 0 ? guestStats : null,
    representation: null,
    guest_crest_url:
      guest && guest.match_team && guest.match_team.system_club
        ? guest.match_team.system_club.crest_url
        : null,
    host_crest_url:
      host && host.match_team && host.match_team.system_club
        ? host.match_team.system_club.crest_url
        : null,
  };

  return result;
};

const processParticipants = (
  participants: Array<QueryMatchParticipantProps>
): Array<ParticipantProps> =>
  participants.map((participant) => {
    return {
      ...participant,
      participant_id: participant.id,
      id: participant.id.toString(),
      match: null,
      match_team: null,
    };
  });

const processMatchPlayers = (
  matchPlayers: Array<QueryMatchPlayerProps>
): Array<MatchPlayerProps> =>
  matchPlayers.map((player) => {
    const statsToReturn: {
      [key in typeof StatTypes[number]]: boolean | number | string;
    } = {} as {
      [key in typeof StatTypes[number]]: boolean | number | string;
    };

    player.stats.forEach((stat) => {
      statsToReturn[stat.name as typeof StatTypes[number]] = stat.value;
    });

    return {
      ...player,
      match_player_id: player.id,
      id: player.id.toString(),
      player_id: player.player != null ? player.player_id : null,
      stats: statsToReturn,
      player: null,
    };
  });

const processMatchEvents = (
  matchEvents: Array<QueryMatchEventProps>
): Array<MatchEventProps> =>
  matchEvents.map((matchEvent) => {
    return {
      ...matchEvent,
      id: matchEvent.id.toString(),
      event_id: matchEvent.id,
      player_id: matchEvent.match_player_id,
      second_player_id: matchEvent.second_match_player_id,
      participant_match: {} as ParticipantProps,
      player: null,
      match_id: matchEvent.laravel_through_key,
      match: null,
    };
  });

const processPlayers = (players: Array<QueryPlayerProps>): Array<PlayerProps> =>
  players.map((player) => {
    if (player.user) {
      delete player["user"];
    }

    return {
      ...player,
      id: player.id.toString(),
      player_id: player.id,
      team: null,
      season: null,
      user: null,
      match_stats_summary: null,
    };
  });

const processUsers = (users: Array<QueryPlayerUserProps>): Array<UserProps> =>
  users.map((user) => ({
    ...user,
    id: user.id.toString(),
    user_id: user.id,
    avatar: undefined,
  }));

const ExtractMatches = async (
  matches: Array<QueryMatchProps>,
  axiosInstance: AxiosInstance
): Promise<ExtractedQueryProps> => {
  const resultData: ExtractedQueryProps = {
    matches: [],
    participants: [],
    matchPlayers: [],
    matchEvents: [],
    players: [],
    users: [],
    leagues: [],
  };

  matches.forEach((match) => {
    leagueCreator.processMatch(match);
    const processedMatch = extractMatchData(match);
    resultData.matches.push(processedMatch.match);

    resultData.users.push(...processUsers(processedMatch.users));

    resultData.participants.push(
      ...processParticipants(processedMatch.participants)
    );

    resultData.players.push(...processPlayers(processedMatch.players));

    resultData.matchPlayers.push(
      ...processMatchPlayers(processedMatch.matchPlayers)
    );

    resultData.matchEvents.push(
      ...processMatchEvents(processedMatch.matchEvents)
    );
  });

  const teamsInLeague = await leagueCreator.getLeagues(axiosInstance);
  resultData.leagues.push(...teamsInLeague);
  return resultData;
};

export default ExtractMatches;
