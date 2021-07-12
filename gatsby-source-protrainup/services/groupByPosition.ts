import {
  DefenderPositions,
  ForwardPositions,
  MidfielderPositions,
  PlayerProps,
} from "../typescript/types/player";

export const groupedPositionNames = [
  "goalkeepers",
  "defenders",
  "midfielders",
  "forwarders",
  "unknown",
] as const;

type GroupedPositionProps = {
  [key in typeof groupedPositionNames[number]]: Array<PlayerProps>;
};

const groupByPosition = (players: Array<PlayerProps>): GroupedPositionProps => {
  const groupedPlayers: GroupedPositionProps = {
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    forwarders: [],
    unknown: [],
  };

  players.forEach((player) => {
    if (player.position) {
      if (DefenderPositions.some(position => position === player.position)) {
        groupedPlayers.defenders.push(player);
      } else if (MidfielderPositions.some(position => position === player.position)) {
        groupedPlayers.midfielders.push(player);
      } else if (ForwardPositions.some(position => position === player.position)) {
        groupedPlayers.forwarders.push(player);
      } else if (player.position === "goalkeeper") {
        groupedPlayers.goalkeepers.push(player);
      } else {
        groupedPlayers.unknown.push(player);
      }
    }
  });


  return groupedPlayers;
};

export default groupByPosition;
