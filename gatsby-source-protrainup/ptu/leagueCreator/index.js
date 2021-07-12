"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _leagues;
Object.defineProperty(exports, "__esModule", { value: true });
const createEmptyStats = () => ({
    team_id: null,
    club_name: "",
    stats: {
        position: 10,
        scores: 0,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        loseGoals: 0,
        goalDifference: 0,
        points: 0,
        direct_matches_goals_difference: null,
        direct_matches_points: null,
    },
});
class LeagueCreator {
    constructor() {
        _leagues.set(this, {});
        this.processMatch = (match) => {
            if (match.game &&
                match.participants &&
                match.own_team > 0 &&
                match.game_id) {
                !(match.game_id in __classPrivateFieldGet(this, _leagues)) && (__classPrivateFieldGet(this, _leagues)[match.game_id] = {});
                const currentLeague = __classPrivateFieldGet(this, _leagues)[match.game_id];
                const host = match.participants
                    ? match.participants.find((participant) => participant.host === true)
                    : null;
                const guest = match.participants
                    ? match.participants.find((participant) => participant.host === false)
                    : null;
                if (guest && host && host.match_team && guest.match_team) {
                    !(guest.match_team_id in currentLeague) &&
                        (currentLeague[guest.match_team_id] = createEmptyStats());
                    !(host.match_team_id in currentLeague) &&
                        (currentLeague[host.match_team_id] = createEmptyStats());
                    const hostInLeague = currentLeague[host.match_team_id];
                    const guestInLeague = currentLeague[guest.match_team_id];
                    hostInLeague.club_name = host.match_team.name;
                    guestInLeague.club_name = guest.match_team.name;
                    if (match.own_team === 1) {
                        hostInLeague.team_id = match.team_id;
                    }
                    else if (match.own_team === 2) {
                        guestInLeague.team_id = match.team_id;
                    }
                }
            }
        };
        this.getLeagues = async (axiosInstance) => {
            const leagueTeams = [];
            const gamesId = Object.keys(__classPrivateFieldGet(this, _leagues));
            axiosInstance;
            await Promise.all(gamesId.map(async (gameId) => {
                const { data: apiTableData } = await axiosInstance.get(`/diary/games/${gameId}/table`);
                const league = __classPrivateFieldGet(this, _leagues)[gameId];
                if (league) {
                    Object.keys(league).forEach((teamId) => {
                        const teamInApiIndex = apiTableData.findIndex((team) => team.team.name === league[teamId].club_name);
                        const table = apiTableData[teamInApiIndex];
                        league[teamId].stats.matches = +table.matches_sum;
                        league[teamId].stats.wins = +table.matches_win;
                        league[teamId].stats.draws = +table.matches_draw;
                        league[teamId].stats.losses = +table.matches_lose;
                        league[teamId].stats.loseGoals = +table.goals_lost;
                        league[teamId].stats.goalDifference = +table.goals_difference;
                        league[teamId].stats.scores = +table.goals_made;
                        league[teamId].stats.points = +table.points;
                        league[teamId].stats.position = teamInApiIndex + 1;
                        if (table.direct_matches_goals_difference) {
                            league[teamId].stats.direct_matches_goals_difference = +table.direct_matches_goals_difference;
                        }
                        if (table.direct_matches_points) {
                            league[teamId].stats.direct_matches_points = +table.direct_matches_points;
                        }
                        leagueTeams.push({
                            club_name: league[teamId].club_name,
                            team: null,
                            team_id: league[teamId].team_id,
                            crest_url: apiTableData[teamInApiIndex].team.system_club.crest_thumb_url,
                            game: {},
                            game_id: +gameId,
                            leagueStats: league[teamId].stats,
                        });
                    });
                }
            }));
            return leagueTeams;
        };
    }
}
_leagues = new WeakMap();
const leagueCreator = new LeagueCreator();
exports.default = leagueCreator;
