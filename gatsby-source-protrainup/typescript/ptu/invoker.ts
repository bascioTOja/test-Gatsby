// Create remote files, and relations from created node
import {
  CreateNodeArgs,
  GatsbyCache,
  Node,
  NodeInput,
  Reporter,
  Store,
} from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { PTUTypes, PTUKeys } from "./nodeCreator/nodeTypes";

type nodeMethodProps = {
  [key in typeof PTUTypes[number]]:
    | ((node: Node) => Promise<void>)
    | ((node: Node) => void)
    | ((node: Node) => undefined);
};

const createRemoteAvatar = async (
  cache: GatsbyCache,
  createNode: (node: NodeInput) => void,
  createNodeId: (input: string) => string,
  node: Node,
  store: Store,
  reporter: Reporter
) => {
  if (typeof node.avatar_url === "string") {
    const avatarRemote = await createRemoteFileNode({
      url: node.avatar_url,
      cache,
      createNode,
      createNodeId,
      parentNodeId: node.id,
      store: store,
      reporter: reporter,
    });

    if (avatarRemote) {
      node.avatar___NODE = avatarRemote.id;
    }
  }
};

class Invoker {
  #cache: GatsbyCache;
  #createNode: (node: NodeInput) => void;
  #createNodeId: (input: string) => string;
  #reporter: Reporter;
  #store: Store;

  constructor(createNodeArgs: CreateNodeArgs) {
    this.#cache = createNodeArgs.cache;
    this.#createNode = createNodeArgs.actions.createNode;
    this.#createNodeId = createNodeArgs.createNodeId;
    this.#store = createNodeArgs.store;
    this.#reporter = createNodeArgs.reporter;
  }

  #onCreateUser = async (node: Node): Promise<void> => {
    try {
      await createRemoteAvatar(
        this.#cache,
        this.#createNode,
        this.#createNodeId,
        node,
        this.#store,
        this.#reporter
      );
    } catch (err) {
      throw Error(
        "gatsby-source-protrainup: Something went wrong with creating node for user"
      );
    }
  };

  #onCreateMatch = async (node: Node): Promise<void> => {
    node.representation___NODE = this.#createNodeId(
      node.team_id + PTUKeys["ProtrainupTeam"]
    );
    node.team___NODE = this.#createNodeId(
      node.team_id + PTUKeys["ProtrainupTeam"]
    );

    node.season___NODE = this.#createNodeId(
      node.season_id + PTUKeys["ProtrainupSeason"]
    );

    if (node.game_id) {
      node.game___NODE = this.#createNodeId(
        node.game_id + PTUKeys["ProtrainupGame"]
      );
    }

    try {
      if (node.host_crest_url) {
        const hostCrestRemote = await createRemoteFileNode({
          url: node.host_crest_url as string,
          cache: this.#cache,
          createNodeId: this.#createNodeId,
          createNode: this.#createNode,
          store: this.#store,
          reporter: this.#reporter,
          parentNodeId: node.id,
        });

        if (hostCrestRemote) {
          node.host_crest___NODE = hostCrestRemote.id;
        }
      }
      if (node.guest_crest_url) {
        const guestCrestRemote = await createRemoteFileNode({
          url: node.guest_crest_url as string,
          cache: this.#cache,
          createNodeId: this.#createNodeId,
          createNode: this.#createNode,
          store: this.#store,
          reporter: this.#reporter,
          parentNodeId: node.id,
        });
        if (guestCrestRemote) {
          node.guest_crest___NODE = guestCrestRemote.id;
        }
      }
    } catch (err) {
      console.log("TU JEST BŁĄD!");
      throw Error(err.message);
    }
  };

  #onCreateSystemClub = async (node: Node): Promise<void> => {
    const crestRemoteFile = await createRemoteFileNode({
      url: node.crest_url as string,
      cache: this.#cache,
      createNode: this.#createNode,
      createNodeId: this.#createNodeId,
      parentNodeId: node.id,
      store: this.#store,
      reporter: this.#reporter,
    });
    if (crestRemoteFile) {
      node.crest___NODE = crestRemoteFile.id;
    }
  };

  #onCreateTeam = (node: Node): void => {
    if (node.system_club_id !== null) {
      node.system_club___NODE = this.#createNodeId(
        node.system_club_id + PTUKeys["ProtrainupSystemClub"]
      );
    }

    if (node.main_coach_id !== null) {
      node.main_coach___NODE = this.#createNodeId(
        node.main_coach_id + PTUKeys["ProtrainupMember"]
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seasons: any = node.annual_seasons;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seasons.forEach((season: any) => {
      season.season___NODE = this.#createNodeId(
        season.season_id + PTUKeys["ProtrainupSeason"]
      );
    });
  };

  #onCreateSeason = async (node: Node): Promise<void> => {
    if (node.image) {
      const teamImage = await createRemoteFileNode({
        url: `https://ksstadion.protrainup.info/storage/system/seasons/image/${node.image}`,
        cache: this.#cache,
        createNode: this.#createNode,
        createNodeId: this.#createNodeId,
        parentNodeId: node.id,
        store: this.#store,
        reporter: this.#reporter,
      });

      if (teamImage) {
        node.team_image___NODE = teamImage.id;
      }
    }
  };

  #onCreatePlayer = (node: Node): void => {
    node.user___NODE = this.#createNodeId(
      node.user_id + PTUKeys["ProtrainupUser"]
    );

    node.team___NODE = this.#createNodeId(
      node.team_id + PTUKeys["ProtrainupTeam"]
    );

    node.season___NODE = this.#createNodeId(
      node.season_id + PTUKeys["ProtrainupSeason"]
    );
  };

  #onCreateMember = (node: Node): void => {
    node.user___NODE = this.#createNodeId(
      node.user_id + PTUKeys["ProtrainupUser"]
    );

    node.season___NODE = this.#createNodeId(
      node.season_id + PTUKeys["ProtrainupSeason"]
    );
  };

  #onCreateTraining = (node: Node): void => {
    node.created_by___NODE = this.#createNodeId(
      node.creator_id + PTUKeys["ProtrainupUser"]
    );

    node.team___NODE = this.#createNodeId(
      node.team_id + PTUKeys["ProtrainupTeam"]
    );
  };

  #onCreatePlayerMatch = (node: Node): void => {
    if (node.player_id != null) {
      node.player___NODE = this.#createNodeId(
        node.player_id + PTUKeys["ProtrainupPlayer"]
      );
    }
    node.match___NODE = this.#createNodeId(
      node.match_id + PTUKeys["ProtrainupMatch"]
    );
  };

  #onCreateParticipant = (node: Node): void => {
    node.match___NODE = this.#createNodeId(
      node.match_id + PTUKeys["ProtrainupMatch"]
    );
  };

  #onCreateMatchEvent = (node: Node): void => {
    if (node.player_id !== null) {
      node.player___NODE = this.#createNodeId(
        node.player_id + PTUKeys["ProtrainupPlayerMatch"]
      );
    }

    if (node.second_player_id !== null) {
      node.second_player___NODE = this.#createNodeId(
        node.second_player_id + PTUKeys["ProtrainupPlayerMatch"]
      );
    }

    node.match___NODE = this.#createNodeId(
      node.match_id + PTUKeys["ProtrainupMatch"]
    );

    node.participant_match___NODE = this.#createNodeId(
      node.match_participant_id + PTUKeys["ProtrainupParticipant"]
    );
  };

  #onCreateLeagueStats = (node: Node): void => {
    node.game___NODE = this.#createNodeId(
      node.game_id + PTUKeys["ProtrainupGame"]
    );

    node.team_id &&
      (node.team___NODE = this.#createNodeId(
        node.team_id + PTUKeys["ProtrainupTeam"]
      ));
  };

  #createMethods: nodeMethodProps = {
    ["ProtrainupUser"]: async (node): Promise<void> =>
      await this.#onCreateUser(node),
    ["ProtrainupMatch"]: async (node): Promise<void> =>
      await this.#onCreateMatch(node),
    ["ProtrainupSystemClub"]: async (node): Promise<void> =>
      await this.#onCreateSystemClub(node),
    ["ProtrainupSeason"]: async (node): Promise<void> =>
      await this.#onCreateSeason(node),
    ["ProtrainupTeam"]: (node): void => this.#onCreateTeam(node),
    ["ProtrainupPlayer"]: (node): void => this.#onCreatePlayer(node),
    ["ProtrainupMember"]: (node): void => this.#onCreateMember(node),
    ["ProtrainupTraining"]: (node): void => this.#onCreateTraining(node),
    ["ProtrainupPlayerMatch"]: (node): void => this.#onCreatePlayerMatch(node),
    ["ProtrainupParticipant"]: (node): void => this.#onCreateParticipant(node),
    ["ProtrainupMatchEvent"]: (node): void => this.#onCreateMatchEvent(node),
    ["ProtrainupLeagueStats"]: (node): void => this.#onCreateLeagueStats(node),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ["ProtrainupEvent"]: (_node): void => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ["ProtrainupGame"]: (_node): void => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } as const;

  invoke = async (node: Node, key: string): Promise<void> => {
    if (this.#createMethods[key as typeof PTUTypes[number]]) {
      await this.#createMethods[key as typeof PTUTypes[number]](node);
    }
  };
}

export default Invoker;
