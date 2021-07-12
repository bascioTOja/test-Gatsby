"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = __importDefault(require("./match"));
const team_1 = __importDefault(require("./team"));
const game_1 = __importDefault(require("./game"));
const player_1 = __importDefault(require("./player"));
const training_1 = __importDefault(require("./training"));
const ExtractAll = async (axiosGetResults, axiosInstance) => {
    const matchesData = await match_1.default(axiosGetResults.matchesQueryData, axiosInstance);
    const games = game_1.default(axiosGetResults.gamesQueryData);
    const playersData = player_1.default(axiosGetResults.playersQueryData);
    const teamsData = team_1.default(axiosGetResults.teamQueryData);
    const trainingsData = training_1.default(axiosGetResults.trainingsData);
    const users = [
        ...playersData.users,
        ...trainingsData.users,
        ...matchesData.users,
    ];
    teamsData.users != null && users.push(...teamsData.users);
    matchesData.players.push(...playersData.players);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, matchesData), playersData), teamsData), trainingsData), { events: axiosGetResults.eventsData, games,
        users });
};
exports.default = ExtractAll;
