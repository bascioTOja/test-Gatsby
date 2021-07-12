import { TeamProps } from "../../types/team";
import {
  QueryTeamMemberProps,
  QueryTeamProps,
  QueryTeamSystemClubProps,
} from "../../types/queries/team";
import { SystemClubProps } from "../../types/systemClub";
import { MemberProps } from "../../types/member";
import { UserProps } from "../../types/player";
import { SeasonProps } from "../../types/season";

type ExtractedQueryProps = {
  teams: Array<TeamProps>;
  systemClubs: Array<SystemClubProps>;
  members: Array<MemberProps>;
  users?: Array<UserProps>;
  seasons: Array<SeasonProps>;
};

type ExtractedTeamProps = {
  members: Array<QueryTeamMemberProps>;
  systemClub: QueryTeamSystemClubProps;
  team: TeamProps;
  seasons: Array<SeasonProps>;
};

const extractTeamData = (teamData: QueryTeamProps): ExtractedTeamProps => {
  const members = teamData.members;
  const systemClub = teamData.system_club;
  const seasons: Array<SeasonProps> = teamData.annual_seasons.map((season) => ({
    ...season,
    season_id: season.id,
    team_image: null,
  }));

  const team: TeamProps = {
    ...teamData,
    id: teamData.id.toString(),
    team_id: teamData.id,
    system_club: null,
    members: null,
    annual_seasons: teamData.annual_seasons.map((season) => ({
      season: null,
      season_id: season.id,
    })),
    slug: teamData.team_name
      .toLowerCase()
      .replace("-", "")
      .replace(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0142/g, "l"),
    main_coach: null,
    main_coach_id: null,
  };

  return {
    members: members,
    systemClub: systemClub,
    team: team,
    seasons: seasons,
  };
};

const extractMembers = (
  members: Array<QueryTeamMemberProps>
): { members: Array<MemberProps>; users: Array<UserProps> } => {
  const usersData: Array<UserProps> = [];
  const membersData = members.map((member) => {
    usersData.push({
      ...member.user,
      id: member.user.id.toString(),
      user_id: member.user.id,
      avatar: undefined,
    });

    return {
      ...member,
      member_id: member.id,
      id: member.id.toString(),
      team: null,
      user: null,
      season: null,
    };
  });

  return { users: usersData, members: membersData };
};

const processSystemClub = (
  systemClub: QueryTeamSystemClubProps
): SystemClubProps => ({
  ...systemClub,
  id: systemClub.id.toString(),
  system_club_id: systemClub.id,
  crest: undefined,
});

const getCoachId = (members: Array<MemberProps>): number | null => {
  const teamTrainer =
    members.find((member) => member.active === true && member.main === true) ||
    members.find((member) => member.active === true && member.type === "coach");

  return teamTrainer !== undefined ? +teamTrainer.id : null;
};

const ExtractTeams = (
  teamsData: Array<QueryTeamProps>
): ExtractedQueryProps => {
  const resultData: ExtractedQueryProps = {
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

    // Don't move from here, order is important
    resultData.systemClubs.push(processSystemClub(processedTeam.systemClub));
  });

  return resultData;
};

export default ExtractTeams;
