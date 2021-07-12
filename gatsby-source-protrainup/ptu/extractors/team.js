"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractTeamData = (teamData) => {
    const members = teamData.members;
    const systemClub = teamData.system_club;
    const seasons = teamData.annual_seasons.map((season) => (Object.assign(Object.assign({}, season), { season_id: season.id, team_image: null })));
    const team = Object.assign(Object.assign({}, teamData), { id: teamData.id.toString(), team_id: teamData.id, system_club: null, members: null, annual_seasons: teamData.annual_seasons.map((season) => ({
            season: null,
            season_id: season.id,
        })), slug: teamData.team_name
            .toLowerCase()
            .replace("-", "")
            .replace(" ", "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\u0142/g, "l"), main_coach: null, main_coach_id: null });
    return {
        members: members,
        systemClub: systemClub,
        team: team,
        seasons: seasons,
    };
};
const extractMembers = (members) => {
    const usersData = [];
    const membersData = members.map((member) => {
        usersData.push(Object.assign(Object.assign({}, member.user), { id: member.user.id.toString(), user_id: member.user.id, avatar: undefined }));
        return Object.assign(Object.assign({}, member), { member_id: member.id, id: member.id.toString(), team: null, user: null, season: null });
    });
    return { users: usersData, members: membersData };
};
const processSystemClub = (systemClub) => (Object.assign(Object.assign({}, systemClub), { id: systemClub.id.toString(), system_club_id: systemClub.id, crest: undefined }));
const getCoachId = (members) => {
    const teamTrainer = members.find((member) => member.active === true && member.main === true) ||
        members.find((member) => member.active === true && member.type === "coach");
    return teamTrainer !== undefined ? +teamTrainer.id : null;
};
const ExtractTeams = (teamsData) => {
    const resultData = {
        teams: [],
        users: [],
        systemClubs: [],
        members: [],
        seasons: [],
    };
    teamsData.forEach((team) => {
        const processedTeam = extractTeamData(team);
        const memberData = extractMembers(processedTeam.members);
        processedTeam.team.main_coach_id = getCoachId(memberData.members);
        resultData.teams.push(processedTeam.team);
        resultData.seasons.push(...processedTeam.seasons);
        resultData.members.push(...memberData.members);
        resultData.users && resultData.users.push(...memberData.users);
        resultData.systemClubs.push(processSystemClub(processedTeam.systemClub));
    });
    return resultData;
};
exports.default = ExtractTeams;
