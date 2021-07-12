"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../../types/player");
const ExtractPlayers = (players) => {
    const users = [];
    players.forEach((player) => {
        if (player.user) {
            users.push(Object.assign(Object.assign({}, player.user), { id: player.user.id.toString(), user_id: player.user_id, avatar: undefined }));
        }
    });
    const extractedPlayers = players.map((player) => {
        if (player.user) {
            delete player["user"];
            delete player["match_stats"];
        }
        const playerStats = {};
        if (player.match_stats_summary) {
            Object.keys(player.match_stats_summary).forEach((key) => {
                if (player_1.MatchStats.some((stat) => stat === key)) {
                    playerStats[key] = player.match_stats_summary[key].valueOf();
                }
            });
        }
        return Object.assign(Object.assign({}, player), { id: player.id.toString(), player_id: player.id, user: null, team: null, season: null, match_stats_summary: Object.keys(playerStats).length > 0 ? playerStats : null });
    });
    return { players: extractedPlayers, users: users };
};
exports.default = ExtractPlayers;
