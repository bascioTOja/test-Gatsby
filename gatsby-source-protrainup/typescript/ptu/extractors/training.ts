import { UserProps } from "../../types/player";
import { QueryPlayerUserProps } from "../../types/queries/player";
import { QueryTrainingProps } from "../../types/queries/training";
import { StaffTypes, TrainingProps } from "../../types/training";

type ExtractedQueryProps = {
  users: Array<UserProps>;
  trainings: Array<TrainingProps>;
};

type ProcessedTeamData = {
  users: Array<QueryPlayerUserProps>;
  trainings: Array<TrainingProps>;
};

const extractTrainingsData = (
  trainingsData: Array<QueryTrainingProps>
): ProcessedTeamData => {
  const users: Array<QueryPlayerUserProps> = [];

  const trainings: Array<TrainingProps> = trainingsData.map((training) => {
    const trainingStaff: Array<{
      full_name: string;
      role: typeof StaffTypes[number];
    }> = [];

    training.staff &&
      training.staff.forEach((staff) => {
        if (staff.user) {
          staff.user && users.push(staff.user);

          staff.user.full_name &&
            trainingStaff.push({
              full_name: staff.user.full_name,
              role: staff.role,
            });
        }

        if (training.location === "" && training.sub_facility) {
          training.location = training.sub_facility.full_name
            ? training.sub_facility.full_name
            : "";
        }
      });

    delete training["sub_facility"];
    delete training["staff"];
    delete training["team"];

    return {
      ...training,
      creator_id: training.created_by,
      created_by: undefined,
      id: training.id.toString(),
      training_id: training.id,
      team: null,
      title: training.topic,
      staff: trainingStaff,
    };
  });

  return { users: users, trainings: trainings };
};

const processUsers = (users: Array<QueryPlayerUserProps>): Array<UserProps> =>
  users.map((user) => ({
    ...user,
    id: user.id.toString(),
    user_id: user.id,
    avatar: undefined,
  }));

const ExtractTrainings = (
  trainingsData: Array<QueryTrainingProps>
): ExtractedQueryProps => {
  const extractedTrainingsData = extractTrainingsData(trainingsData);
  const users = processUsers(extractedTrainingsData.users);

  return {
    users: users,
    trainings: extractedTrainingsData.trainings,
  } as ExtractedQueryProps;
};

export default ExtractTrainings;
