import { NodeInput, SourceNodesArgs } from "gatsby";
import { GameProps, LeagueGameProps } from "../../types/game";
import {
  MatchEventProps,
  MatchPlayerProps,
  MatchProps,
  ParticipantProps,
} from "../../types/match";
import { MemberProps } from "../../types/member";
import { PlayerProps, UserProps } from "../../types/player";
import { EventProps } from "../../types";
import { SystemClubProps } from "../../types/systemClub";
import { TeamProps } from "../../types/team";
import { TrainingProps } from "../../types/training";
import { MainQueriesExtractorProps } from "../extractors";
import { PTUKeys } from "./nodeTypes";
import { SeasonProps } from "../../types/season";

class PTUNodeCreator {
  #createNodeId;
  #createContentDigest;
  #createNode;

  constructor({
    actions: { createNode },
    createContentDigest,
    createNodeId,
  }: SourceNodesArgs) {
    this.#createNodeId = createNodeId;
    this.#createContentDigest = createContentDigest;
    this.#createNode = createNode;
  }

  #processTeam = async (team: TeamProps): Promise<NodeInput> => ({
    ...team,
    id: this.#createNodeId(team.id + PTUKeys["ProtrainupTeam"]),
    internal: {
      type: "ProtrainupTeam",
      contentDigest: this.#createContentDigest(team),
    },
  });

  #processMatchEvent = async (
    matchEvent: MatchEventProps
  ): Promise<NodeInput> => ({
    ...matchEvent,
    id: this.#createNodeId(matchEvent.id + PTUKeys["ProtrainupMatchEvent"]),
    internal: {
      type: "ProtrainupMatchEvent",
      contentDigest: this.#createContentDigest(matchEvent),
    },
  });

  #processMember = async (member: MemberProps): Promise<NodeInput> => ({
    ...member,
    id: this.#createNodeId(member.id + PTUKeys["ProtrainupMember"]),
    internal: {
      type: "ProtrainupMember",
      contentDigest: this.#createContentDigest(member),
    },
  });

  #processUser = async (user: UserProps): Promise<NodeInput> => ({
    ...user,
    id: this.#createNodeId(user.id + PTUKeys["ProtrainupUser"]),
    internal: {
      type: "ProtrainupUser",
      contentDigest: this.#createContentDigest(user),
    },
  });

  #processSystemClub = async (
    systemClub: SystemClubProps
  ): Promise<NodeInput> => ({
    ...systemClub,
    id: this.#createNodeId(systemClub.id + PTUKeys["ProtrainupSystemClub"]),
    internal: {
      type: "ProtrainupSystemClub",
      contentDigest: this.#createContentDigest(systemClub),
    },
  });

  #processPlayer = async (player: PlayerProps): Promise<NodeInput> => ({
    ...player,
    id: this.#createNodeId(player.id + PTUKeys["ProtrainupPlayer"]),
    internal: {
      type: "ProtrainupPlayer",
      contentDigest: this.#createContentDigest(player),
    },
  });

  #processMatch = async (match: MatchProps): Promise<NodeInput> => ({
    ...match,
    id: this.#createNodeId(match.id + PTUKeys["ProtrainupMatch"]),
    internal: {
      type: "ProtrainupMatch",
      contentDigest: this.#createContentDigest(match),
    },
  });

  #processParticipant = async (
    participant: ParticipantProps
  ): Promise<NodeInput> => ({
    ...participant,
    id: this.#createNodeId(participant.id + PTUKeys["ProtrainupParticipant"]),
    internal: {
      type: "ProtrainupParticipant",
      contentDigest: this.#createContentDigest(participant),
    },
  });

  #processGame = async (game: GameProps): Promise<NodeInput> => ({
    ...game,
    id: this.#createNodeId(game.id + PTUKeys["ProtrainupGame"]),
    internal: {
      type: "ProtrainupGame",
      contentDigest: this.#createContentDigest(game),
    },
  });

  #processEvent = async (event: EventProps): Promise<NodeInput> => ({
    ...event,
    id: this.#createNodeId(event.oid + PTUKeys["ProtrainupEvent"]),
    internal: {
      type: "ProtrainupEvent",
      contentDigest: this.#createContentDigest(event),
    },
  });

  #processTraining = async (training: TrainingProps): Promise<NodeInput> => ({
    ...training,
    id: this.#createNodeId(training.id + PTUKeys["ProtrainupTraining"]),
    internal: {
      type: "ProtrainupTraining",
      contentDigest: this.#createContentDigest(training),
    },
  });

  #processPlayerMatch = async (
    playerMatch: MatchPlayerProps
  ): Promise<NodeInput> => ({
    ...playerMatch,
    id: this.#createNodeId(playerMatch.id + PTUKeys["ProtrainupPlayerMatch"]),
    internal: {
      type: "ProtrainupPlayerMatch",
      contentDigest: this.#createContentDigest(playerMatch),
    },
  });

  #processLeague = async (league: LeagueGameProps): Promise<NodeInput> => ({
    ...league,
    // To keep it always unique combine game id with the team id
    id: this.#createNodeId(
      league.game_id + league.club_name + PTUKeys["ProtrainupLeagueStats"]
    ),
    internal: {
      type: "ProtrainupLeagueStats",
      contentDigest: this.#createContentDigest(league),
    },
  });

  #processSeason = async (season: SeasonProps): Promise<NodeInput> => ({
    ...season,
    id: this.#createNodeId(season.id + PTUKeys["ProtrainupSeason"]),
    internal: {
      type: "ProtrainupSeason",
      contentDigest: this.#createContentDigest(season),
    },
  });

  createNodes = async (nodesData: MainQueriesExtractorProps): Promise<void> => {
    try {
      Promise.all([
        nodesData.seasons.map(async (season) =>
          this.#createNode(await this.#processSeason(season))
        ),
        nodesData.teams.map(async (team) =>
          this.#createNode(await this.#processTeam(team))
        ),
        nodesData.matchEvents.map(async (matchEvent) =>
          this.#createNode(await this.#processMatchEvent(matchEvent))
        ),
        nodesData.members.map(async (member) =>
          this.#createNode(await this.#processMember(member))
        ),
        nodesData.users.map(async (user) =>
          this.#createNode(await this.#processUser(user))
        ),
        nodesData.systemClubs.map(async (club) =>
          this.#createNode(await this.#processSystemClub(club))
        ),
        nodesData.players.map(async (player) =>
          this.#createNode(await this.#processPlayer(player))
        ),
        nodesData.matches.map(async (match) =>
          this.#createNode(await this.#processMatch(match))
        ),
        nodesData.participants.map(async (participant) =>
          this.#createNode(await this.#processParticipant(participant))
        ),
        nodesData.games.map(async (game) =>
          this.#createNode(await this.#processGame(game))
        ),
        nodesData.events.map(async (event) =>
          this.#createNode(await this.#processEvent(event))
        ),
        nodesData.trainings.map(async (training) =>
          this.#createNode(await this.#processTraining(training))
        ),
        nodesData.matchPlayers.map(async (playerMatch) =>
          this.#createNode(await this.#processPlayerMatch(playerMatch))
        ),
        nodesData.leagues.map(async (league) =>
          this.#createNode(await this.#processLeague(league))
        ),
      ]);
    } catch (err) {
      throw Error(
        "gatsby-source-protrainup: Something went wrong with creating nodes!"
      );
    }
  };
}

export default PTUNodeCreator;
