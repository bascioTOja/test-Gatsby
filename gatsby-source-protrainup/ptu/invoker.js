"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cache, _createNode, _createNodeId, _reporter, _store, _onCreateUser, _onCreateMatch, _onCreateSystemClub, _onCreateTeam, _onCreateSeason, _onCreatePlayer, _onCreateMember, _onCreateTraining, _onCreatePlayerMatch, _onCreateParticipant, _onCreateMatchEvent, _onCreateLeagueStats, _createMethods;
Object.defineProperty(exports, "__esModule", { value: true });
const gatsby_source_filesystem_1 = require("gatsby-source-filesystem");
const nodeTypes_1 = require("./nodeCreator/nodeTypes");
const createRemoteAvatar = async (cache, createNode, createNodeId, node, store, reporter) => {
    if (typeof node.avatar_url === "string") {
        const avatarRemote = await gatsby_source_filesystem_1.createRemoteFileNode({
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
    constructor(createNodeArgs) {
        _cache.set(this, void 0);
        _createNode.set(this, void 0);
        _createNodeId.set(this, void 0);
        _reporter.set(this, void 0);
        _store.set(this, void 0);
        _onCreateUser.set(this, async (node) => {
            try {
                await createRemoteAvatar(__classPrivateFieldGet(this, _cache), __classPrivateFieldGet(this, _createNode), __classPrivateFieldGet(this, _createNodeId), node, __classPrivateFieldGet(this, _store), __classPrivateFieldGet(this, _reporter));
            }
            catch (err) {
                throw Error("gatsby-source-protrainup: Something went wrong with creating node for user");
            }
        });
        _onCreateMatch.set(this, async (node) => {
            node.representation___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.team_id + nodeTypes_1.PTUKeys["ProtrainupTeam"]);
            node.team___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.team_id + nodeTypes_1.PTUKeys["ProtrainupTeam"]);
            node.season___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.season_id + nodeTypes_1.PTUKeys["ProtrainupSeason"]);
            if (node.game_id) {
                node.game___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.game_id + nodeTypes_1.PTUKeys["ProtrainupGame"]);
            }
            try {
                if (node.host_crest_url) {
                    const hostCrestRemote = await gatsby_source_filesystem_1.createRemoteFileNode({
                        url: node.host_crest_url,
                        cache: __classPrivateFieldGet(this, _cache),
                        createNodeId: __classPrivateFieldGet(this, _createNodeId),
                        createNode: __classPrivateFieldGet(this, _createNode),
                        store: __classPrivateFieldGet(this, _store),
                        reporter: __classPrivateFieldGet(this, _reporter),
                        parentNodeId: node.id,
                    });
                    if (hostCrestRemote) {
                        node.host_crest___NODE = hostCrestRemote.id;
                    }
                }
                if (node.guest_crest_url) {
                    const guestCrestRemote = await gatsby_source_filesystem_1.createRemoteFileNode({
                        url: node.guest_crest_url,
                        cache: __classPrivateFieldGet(this, _cache),
                        createNodeId: __classPrivateFieldGet(this, _createNodeId),
                        createNode: __classPrivateFieldGet(this, _createNode),
                        store: __classPrivateFieldGet(this, _store),
                        reporter: __classPrivateFieldGet(this, _reporter),
                        parentNodeId: node.id,
                    });
                    if (guestCrestRemote) {
                        node.guest_crest___NODE = guestCrestRemote.id;
                    }
                }
            }
            catch (err) {
                console.log("TU JEST BŁĄD!");
                throw Error(err.message);
            }
        });
        _onCreateSystemClub.set(this, async (node) => {
            const crestRemoteFile = await gatsby_source_filesystem_1.createRemoteFileNode({
                url: node.crest_url,
                cache: __classPrivateFieldGet(this, _cache),
                createNode: __classPrivateFieldGet(this, _createNode),
                createNodeId: __classPrivateFieldGet(this, _createNodeId),
                parentNodeId: node.id,
                store: __classPrivateFieldGet(this, _store),
                reporter: __classPrivateFieldGet(this, _reporter),
            });
            if (crestRemoteFile) {
                node.crest___NODE = crestRemoteFile.id;
            }
        });
        _onCreateTeam.set(this, (node) => {
            if (node.system_club_id !== null) {
                node.system_club___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.system_club_id + nodeTypes_1.PTUKeys["ProtrainupSystemClub"]);
            }
            if (node.main_coach_id !== null) {
                node.main_coach___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.main_coach_id + nodeTypes_1.PTUKeys["ProtrainupMember"]);
            }
            const seasons = node.annual_seasons;
            seasons.forEach((season) => {
                season.season___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, season.season_id + nodeTypes_1.PTUKeys["ProtrainupSeason"]);
            });
        });
        _onCreateSeason.set(this, async (node) => {
            if (node.image) {
                const teamImage = await gatsby_source_filesystem_1.createRemoteFileNode({
                    url: `https://ksstadion.protrainup.info/storage/system/seasons/image/${node.image}`,
                    cache: __classPrivateFieldGet(this, _cache),
                    createNode: __classPrivateFieldGet(this, _createNode),
                    createNodeId: __classPrivateFieldGet(this, _createNodeId),
                    parentNodeId: node.id,
                    store: __classPrivateFieldGet(this, _store),
                    reporter: __classPrivateFieldGet(this, _reporter),
                });
                if (teamImage) {
                    node.team_image___NODE = teamImage.id;
                }
            }
        });
        _onCreatePlayer.set(this, (node) => {
            node.user___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.user_id + nodeTypes_1.PTUKeys["ProtrainupUser"]);
            node.team___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.team_id + nodeTypes_1.PTUKeys["ProtrainupTeam"]);
            node.season___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.season_id + nodeTypes_1.PTUKeys["ProtrainupSeason"]);
        });
        _onCreateMember.set(this, (node) => {
            node.user___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.user_id + nodeTypes_1.PTUKeys["ProtrainupUser"]);
            node.season___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.season_id + nodeTypes_1.PTUKeys["ProtrainupSeason"]);
        });
        _onCreateTraining.set(this, (node) => {
            node.created_by___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.creator_id + nodeTypes_1.PTUKeys["ProtrainupUser"]);
            node.team___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.team_id + nodeTypes_1.PTUKeys["ProtrainupTeam"]);
        });
        _onCreatePlayerMatch.set(this, (node) => {
            if (node.player_id != null) {
                node.player___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.player_id + nodeTypes_1.PTUKeys["ProtrainupPlayer"]);
            }
            node.match___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.match_id + nodeTypes_1.PTUKeys["ProtrainupMatch"]);
        });
        _onCreateParticipant.set(this, (node) => {
            node.match___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.match_id + nodeTypes_1.PTUKeys["ProtrainupMatch"]);
        });
        _onCreateMatchEvent.set(this, (node) => {
            if (node.player_id !== null) {
                node.player___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.player_id + nodeTypes_1.PTUKeys["ProtrainupPlayerMatch"]);
            }
            if (node.second_player_id !== null) {
                node.second_player___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.second_player_id + nodeTypes_1.PTUKeys["ProtrainupPlayerMatch"]);
            }
            node.match___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.match_id + nodeTypes_1.PTUKeys["ProtrainupMatch"]);
            node.participant_match___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.match_participant_id + nodeTypes_1.PTUKeys["ProtrainupParticipant"]);
        });
        _onCreateLeagueStats.set(this, (node) => {
            node.game___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.game_id + nodeTypes_1.PTUKeys["ProtrainupGame"]);
            node.team_id &&
                (node.team___NODE = __classPrivateFieldGet(this, _createNodeId).call(this, node.team_id + nodeTypes_1.PTUKeys["ProtrainupTeam"]));
        });
        _createMethods.set(this, {
            ["ProtrainupUser"]: async (node) => await __classPrivateFieldGet(this, _onCreateUser).call(this, node),
            ["ProtrainupMatch"]: async (node) => await __classPrivateFieldGet(this, _onCreateMatch).call(this, node),
            ["ProtrainupSystemClub"]: async (node) => await __classPrivateFieldGet(this, _onCreateSystemClub).call(this, node),
            ["ProtrainupSeason"]: async (node) => await __classPrivateFieldGet(this, _onCreateSeason).call(this, node),
            ["ProtrainupTeam"]: (node) => __classPrivateFieldGet(this, _onCreateTeam).call(this, node),
            ["ProtrainupPlayer"]: (node) => __classPrivateFieldGet(this, _onCreatePlayer).call(this, node),
            ["ProtrainupMember"]: (node) => __classPrivateFieldGet(this, _onCreateMember).call(this, node),
            ["ProtrainupTraining"]: (node) => __classPrivateFieldGet(this, _onCreateTraining).call(this, node),
            ["ProtrainupPlayerMatch"]: (node) => __classPrivateFieldGet(this, _onCreatePlayerMatch).call(this, node),
            ["ProtrainupParticipant"]: (node) => __classPrivateFieldGet(this, _onCreateParticipant).call(this, node),
            ["ProtrainupMatchEvent"]: (node) => __classPrivateFieldGet(this, _onCreateMatchEvent).call(this, node),
            ["ProtrainupLeagueStats"]: (node) => __classPrivateFieldGet(this, _onCreateLeagueStats).call(this, node),
            ["ProtrainupEvent"]: (_node) => undefined,
            ["ProtrainupGame"]: (_node) => undefined,
        });
        this.invoke = async (node, key) => {
            if (__classPrivateFieldGet(this, _createMethods)[key]) {
                await __classPrivateFieldGet(this, _createMethods)[key](node);
            }
        };
        __classPrivateFieldSet(this, _cache, createNodeArgs.cache);
        __classPrivateFieldSet(this, _createNode, createNodeArgs.actions.createNode);
        __classPrivateFieldSet(this, _createNodeId, createNodeArgs.createNodeId);
        __classPrivateFieldSet(this, _store, createNodeArgs.store);
        __classPrivateFieldSet(this, _reporter, createNodeArgs.reporter);
    }
}
_cache = new WeakMap(), _createNode = new WeakMap(), _createNodeId = new WeakMap(), _reporter = new WeakMap(), _store = new WeakMap(), _onCreateUser = new WeakMap(), _onCreateMatch = new WeakMap(), _onCreateSystemClub = new WeakMap(), _onCreateTeam = new WeakMap(), _onCreateSeason = new WeakMap(), _onCreatePlayer = new WeakMap(), _onCreateMember = new WeakMap(), _onCreateTraining = new WeakMap(), _onCreatePlayerMatch = new WeakMap(), _onCreateParticipant = new WeakMap(), _onCreateMatchEvent = new WeakMap(), _onCreateLeagueStats = new WeakMap(), _createMethods = new WeakMap();
exports.default = Invoker;
