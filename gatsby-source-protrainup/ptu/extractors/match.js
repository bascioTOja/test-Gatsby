"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const leagueCreator_1 = __importDefault(require("../leagueCreator"));
const extractMatchData = (match) => {
    const result = {
        participants: match.participants ? match.participants : [],
        matchPlayers: match.match_players ? match.match_players : [],
        matchEvents: match.events ? match.events : [],
        players: [],
        users: [],
        match: {},
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
        const timeInSeconds = parseInt(splitedHour[0]) * 3600 + parseInt(splitedHour[1]) * 60;
        match.date = moment_1.default(match.date)
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
    const hostStats = {};
    const guestStats = {};
    if (host && host.stats) {
        host.stats.forEach((stat) => {
            hostStats[stat.name] = stat.value.toString();
        });
        delete host["stats"];
    }
    if (guest && guest.stats) {
        guest.stats.forEach((stat) => {
            guestStats[stat.name] = stat.value.toString();
        });
        delete guest["stats"];
    }
    result.match = Object.assign(Object.assign({}, match), { match_id: match.id, id: match.id.toString(), team: null, season: null, guest_name: guest && guest.match_team ? guest.match_team.name : "", host_name: host && host.match_team ? host.match_team.name : "", is_future: moment_1.default().isSameOrBefore(match.date), game: null, host_stats: Object.keys(hostStats).length > 0 ? hostStats : null, guest_stats: Object.keys(guestStats).length > 0 ? guestStats : null, representation: null, guest_crest_url: guest && guest.match_team && guest.match_team.system_club
            ? guest.match_team.system_club.crest_url
            : null, host_crest_url: host && host.match_team && host.match_team.system_club
            ? host.match_team.system_club.crest_url
            : null });
    return result;
};
const processParticipants = (participants) => participants.map((participant) => {
    return Object.assign(Object.assign({}, participant), { participant_id: participant.id, id: participant.id.toString(), match: null, match_team: null });
});
const processMatchPlayers = (matchPlayers) => matchPlayers.map((player) => {
    const statsToReturn = {};
    player.stats.forEach((stat) => {
        statsToReturn[stat.name] = stat.value;
    });
    return Object.assign(Object.assign({}, player), { match_player_id: player.id, id: player.id.toString(), player_id: player.player != null ? player.player_id : null, stats: statsToReturn, player: null });
});
const processMatchEvents = (matchEvents) => matchEvents.map((matchEvent) => {
    return Object.assign(Object.assign({}, matchEvent), { id: matchEvent.id.toString(), event_id: matchEvent.id, player_id: matchEvent.match_player_id, second_player_id: matchEvent.second_match_player_id, participant_match: {}, player: null, match_id: matchEvent.laravel_through_key, match: null });
});
const processPlayers = (players) => players.map((player) => {
    if (player.user) {
        delete player["user"];
    }
    return Object.assign(Object.assign({}, player), { id: player.id.toString(), player_id: player.id, team: null, season: null, user: null, match_stats_summary: null });
});
const processUsers = (users) => users.map((user) => (Object.assign(Object.assign({}, user), { id: user.id.toString(), user_id: user.id, avatar: undefined })));
const ExtractMatches = async (matches, axiosInstance) => {
    const resultData = {
        matches: [],
        participants: [],
        matchPlayers: [],
        matchEvents: [],
        players: [],
        users: [],
        leagues: [],
    };
    matches.forEach((match) => {
        leagueCreator_1.default.processMatch(match);
        const processedMatch = extractMatchData(match);
        resultData.matches.push(processedMatch.match);
        resultData.users.push(...processUsers(processedMatch.users));
        resultData.participants.push(...processParticipants(processedMatch.participants));
        resultData.players.push(...processPlayers(processedMatch.players));
        resultData.matchPlayers.push(...processMatchPlayers(processedMatch.matchPlayers));
        resultData.matchEvents.push(...processMatchEvents(processedMatch.matchEvents));
    });
    const teamsInLeague = await leagueCreator_1.default.getLeagues(axiosInstance);
    resultData.leagues.push(...teamsInLeague);
    return resultData;
};
exports.default = ExtractMatches;
