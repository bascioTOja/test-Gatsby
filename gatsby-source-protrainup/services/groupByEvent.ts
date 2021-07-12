import { ParticipantStatsProps } from "../typescript/types";
import { MatchEventProps, MatchEventTypes } from "../typescript/types/match";

const createEmptyParticipantProps = (): ParticipantStatsProps => ({
  substitution: [],
  score: [],
  red_card: [],
  defense: [],
  technical_foul: [],
  throw: [],
  yellow_card: [],
});

const areEventsEmpty = (events: ParticipantStatsProps): boolean =>
  !Object.keys(events).some(
    (key: string) => events[key as typeof MatchEventTypes[number]].length > 0
  );

const groupEventData = (
  events: Array<MatchEventProps>
): {
  hostEvents: ParticipantStatsProps | null;
  guestEvents: ParticipantStatsProps | null;
} => {
  const hostEvents: ParticipantStatsProps = createEmptyParticipantProps();
  const guestEvents: ParticipantStatsProps = createEmptyParticipantProps();

  events.forEach((event) => {
    if (event.participant_match.host === true) {
      hostEvents[event.type].push({ ...event });
    } else {
      guestEvents[event.type].push({ ...event });
    }
  });

  return {
    hostEvents: areEventsEmpty(hostEvents) ? null : hostEvents,
    guestEvents: areEventsEmpty(guestEvents) ? null : guestEvents,
  };
};

export default groupEventData;
