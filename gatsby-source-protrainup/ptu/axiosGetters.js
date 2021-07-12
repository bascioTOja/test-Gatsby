"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const fetchTeams = async () => axios_1.default.get(`/diary/teams?_with=annualSeasons,systemClub,members.user.profile`);
const fetchMatches = async () => axios_1.default.get(`/diary/matches?_with=participants.stats,matchPlayers.stats,participants.matchTeam.systemClub,events,matchPlayers.player.user,season`);
const fetchPlayers = async () => axios_1.default.get(`/diary/players?_with=user&_appends=match_stats_summary`);
const fetchGames = () => axios_1.default.get(`/diary/games`);
const fetchCalendar = () => axios_1.default.get(`/calendar`, {
    data: {
        from: moment_1.default().subtract(1, "years").format("YYYY-MM-DD"),
        to: moment_1.default().add(1, "years").format("YYYY-MM-DD"),
    },
});
const fetchTrainings = () => axios_1.default.get(`/diary/trainings?_with=staff.user,subFacility`);
const fetchAllEndpoints = async () => {
    try {
        const [{ data: teamsData }, { data: matchesData }, { data: playersData }, { data: gamesData }, { data: eventsData }, { data: trainingsData },] = await axios_1.default.all([
            fetchTeams(),
            fetchMatches(),
            fetchPlayers(),
            fetchGames(),
            fetchCalendar(),
            fetchTrainings(),
        ]);
        return {
            teamQueryData: teamsData,
            matchesQueryData: matchesData,
            playersQueryData: playersData,
            gamesQueryData: gamesData,
            eventsData: eventsData,
            trainingsData: trainingsData,
        };
    }
    catch (err) {
        console.log(err.message);
        console.log(err);
        throw Error("gatsby-source-protrainup: Sorry something went wrong during catching data from PTU");
    }
};
exports.default = fetchAllEndpoints;
