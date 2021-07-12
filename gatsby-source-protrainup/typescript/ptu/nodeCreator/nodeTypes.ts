// I am fetching data from SQL API, so i have to provide unique ID
// To do it, to every type i will assign unique key
export const PTUTypes = [
  "ProtrainupTeam",
  "ProtrainupPlayer",
  "ProtrainupUser",
  "ProtrainupMatch",
  "ProtrainupSystemClub",
  "ProtrainupMember",
  "ProtrainupTraining",
  "ProtrainupEvent",
  "ProtrainupGame",
  "ProtrainupPlayerMatch",
  "ProtrainupParticipant",
  "ProtrainupMatchEvent",
  "ProtrainupLeagueStats",
  "ProtrainupSeason"
] as const;

export type PTUKey = {
  [key in typeof PTUTypes[number]]: string;
};

export const PTUKeys: PTUKey = {
  ProtrainupTeam: "PT",
  ProtrainupPlayer: "PP",
  ProtrainupUser: "PU",
  ProtrainupMatch: "PM",
  ProtrainupSystemClub: "PSC",
  ProtrainupMember: "PME",
  ProtrainupTraining: "PTR",
  ProtrainupEvent: "PE",
  ProtrainupGame: "PG",
  ProtrainupPlayerMatch: "PPM",
  ProtrainupParticipant: "PP",
  ProtrainupMatchEvent: "PME",
  ProtrainupLeagueStats: "PLS",
  ProtrainupSeason: "PS"
};
