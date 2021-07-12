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
var _createNodeId, _createContentDigest, _createNode, _processTeam, _processMatchEvent, _processMember, _processUser, _processSystemClub, _processPlayer, _processMatch, _processParticipant, _processGame, _processEvent, _processTraining, _processPlayerMatch, _processLeague, _processSeason;
Object.defineProperty(exports, "__esModule", { value: true });
const nodeTypes_1 = require("./nodeTypes");
class PTUNodeCreator {
    constructor({ actions: { createNode }, createContentDigest, createNodeId, }) {
        _createNodeId.set(this, void 0);
        _createContentDigest.set(this, void 0);
        _createNode.set(this, void 0);
        _processTeam.set(this, async (team) => (Object.assign(Object.assign({}, team), { id: __classPrivateFieldGet(this, _createNodeId).call(this, team.id + nodeTypes_1.PTUKeys["ProtrainupTeam"]), internal: {
                type: "ProtrainupTeam",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, team),
            } })));
        _processMatchEvent.set(this, async (matchEvent) => (Object.assign(Object.assign({}, matchEvent), { id: __classPrivateFieldGet(this, _createNodeId).call(this, matchEvent.id + nodeTypes_1.PTUKeys["ProtrainupMatchEvent"]), internal: {
                type: "ProtrainupMatchEvent",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, matchEvent),
            } })));
        _processMember.set(this, async (member) => (Object.assign(Object.assign({}, member), { id: __classPrivateFieldGet(this, _createNodeId).call(this, member.id + nodeTypes_1.PTUKeys["ProtrainupMember"]), internal: {
                type: "ProtrainupMember",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, member),
            } })));
        _processUser.set(this, async (user) => (Object.assign(Object.assign({}, user), { id: __classPrivateFieldGet(this, _createNodeId).call(this, user.id + nodeTypes_1.PTUKeys["ProtrainupUser"]), internal: {
                type: "ProtrainupUser",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, user),
            } })));
        _processSystemClub.set(this, async (systemClub) => (Object.assign(Object.assign({}, systemClub), { id: __classPrivateFieldGet(this, _createNodeId).call(this, systemClub.id + nodeTypes_1.PTUKeys["ProtrainupSystemClub"]), internal: {
                type: "ProtrainupSystemClub",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, systemClub),
            } })));
        _processPlayer.set(this, async (player) => (Object.assign(Object.assign({}, player), { id: __classPrivateFieldGet(this, _createNodeId).call(this, player.id + nodeTypes_1.PTUKeys["ProtrainupPlayer"]), internal: {
                type: "ProtrainupPlayer",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, player),
            } })));
        _processMatch.set(this, async (match) => (Object.assign(Object.assign({}, match), { id: __classPrivateFieldGet(this, _createNodeId).call(this, match.id + nodeTypes_1.PTUKeys["ProtrainupMatch"]), internal: {
                type: "ProtrainupMatch",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, match),
            } })));
        _processParticipant.set(this, async (participant) => (Object.assign(Object.assign({}, participant), { id: __classPrivateFieldGet(this, _createNodeId).call(this, participant.id + nodeTypes_1.PTUKeys["ProtrainupParticipant"]), internal: {
                type: "ProtrainupParticipant",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, participant),
            } })));
        _processGame.set(this, async (game) => (Object.assign(Object.assign({}, game), { id: __classPrivateFieldGet(this, _createNodeId).call(this, game.id + nodeTypes_1.PTUKeys["ProtrainupGame"]), internal: {
                type: "ProtrainupGame",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, game),
            } })));
        _processEvent.set(this, async (event) => (Object.assign(Object.assign({}, event), { id: __classPrivateFieldGet(this, _createNodeId).call(this, event.oid + nodeTypes_1.PTUKeys["ProtrainupEvent"]), internal: {
                type: "ProtrainupEvent",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, event),
            } })));
        _processTraining.set(this, async (training) => (Object.assign(Object.assign({}, training), { id: __classPrivateFieldGet(this, _createNodeId).call(this, training.id + nodeTypes_1.PTUKeys["ProtrainupTraining"]), internal: {
                type: "ProtrainupTraining",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, training),
            } })));
        _processPlayerMatch.set(this, async (playerMatch) => (Object.assign(Object.assign({}, playerMatch), { id: __classPrivateFieldGet(this, _createNodeId).call(this, playerMatch.id + nodeTypes_1.PTUKeys["ProtrainupPlayerMatch"]), internal: {
                type: "ProtrainupPlayerMatch",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, playerMatch),
            } })));
        _processLeague.set(this, async (league) => (Object.assign(Object.assign({}, league), { id: __classPrivateFieldGet(this, _createNodeId).call(this, league.game_id + league.club_name + nodeTypes_1.PTUKeys["ProtrainupLeagueStats"]), internal: {
                type: "ProtrainupLeagueStats",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, league),
            } })));
        _processSeason.set(this, async (season) => (Object.assign(Object.assign({}, season), { id: __classPrivateFieldGet(this, _createNodeId).call(this, season.id + nodeTypes_1.PTUKeys["ProtrainupSeason"]), internal: {
                type: "ProtrainupSeason",
                contentDigest: __classPrivateFieldGet(this, _createContentDigest).call(this, season),
            } })));
        this.createNodes = async (nodesData) => {
            try {
                Promise.all([
                    nodesData.seasons.map(async (season) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processSeason).call(this, season))),
                    nodesData.teams.map(async (team) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processTeam).call(this, team))),
                    nodesData.matchEvents.map(async (matchEvent) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processMatchEvent).call(this, matchEvent))),
                    nodesData.members.map(async (member) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processMember).call(this, member))),
                    nodesData.users.map(async (user) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processUser).call(this, user))),
                    nodesData.systemClubs.map(async (club) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processSystemClub).call(this, club))),
                    nodesData.players.map(async (player) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processPlayer).call(this, player))),
                    nodesData.matches.map(async (match) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processMatch).call(this, match))),
                    nodesData.participants.map(async (participant) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processParticipant).call(this, participant))),
                    nodesData.games.map(async (game) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processGame).call(this, game))),
                    nodesData.events.map(async (event) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processEvent).call(this, event))),
                    nodesData.trainings.map(async (training) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processTraining).call(this, training))),
                    nodesData.matchPlayers.map(async (playerMatch) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processPlayerMatch).call(this, playerMatch))),
                    nodesData.leagues.map(async (league) => __classPrivateFieldGet(this, _createNode).call(this, await __classPrivateFieldGet(this, _processLeague).call(this, league))),
                ]);
            }
            catch (err) {
                throw Error("gatsby-source-protrainup: Something went wrong with creating nodes!");
            }
        };
        __classPrivateFieldSet(this, _createNodeId, createNodeId);
        __classPrivateFieldSet(this, _createContentDigest, createContentDigest);
        __classPrivateFieldSet(this, _createNode, createNode);
    }
}
_createNodeId = new WeakMap(), _createContentDigest = new WeakMap(), _createNode = new WeakMap(), _processTeam = new WeakMap(), _processMatchEvent = new WeakMap(), _processMember = new WeakMap(), _processUser = new WeakMap(), _processSystemClub = new WeakMap(), _processPlayer = new WeakMap(), _processMatch = new WeakMap(), _processParticipant = new WeakMap(), _processGame = new WeakMap(), _processEvent = new WeakMap(), _processTraining = new WeakMap(), _processPlayerMatch = new WeakMap(), _processLeague = new WeakMap(), _processSeason = new WeakMap();
exports.default = PTUNodeCreator;
