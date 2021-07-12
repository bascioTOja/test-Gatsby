import {ParticipantStatsProps } from "../typescript/types";
import { MatchEventProps, MatchEventTypes } from "../typescript/types/match";

export const SortScoreByMinute = (
  scores: Array<MatchEventProps>
): Array<MatchEventProps> =>
  scores.sort((a, b) => {
    if (a.minute && b.minute) {
      return a.minute - b.minute;
    }
    return 0;
  });

export const SortEventByPlayerNumber = (
  stats: ParticipantStatsProps,
  key: typeof MatchEventTypes[number]
): Array<MatchEventProps> =>
  stats[key].sort((a, b) => {
    if (
      !a.player ||
      !b.player ||
      !a.player.player ||
      !b.player.player ||
      !a.player.player.number ||
      !b.player.player.number
    ) {
      throw Error("Incorrect sort function data");
    }
    
    return a.player.player.number - b.player.player.number;
  });

export const SortEventByMinute = (
  stats: ParticipantStatsProps,
  key: typeof MatchEventTypes[number]
): Array<MatchEventProps> =>
  stats[key as typeof MatchEventTypes[number]].sort((a, b) => {
    if (!a.minute|| !b.minute) {
      return 0;
    }
    return a.minute - b.minute;
  });
