"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractTrainingsData = (trainingsData) => {
    const users = [];
    const trainings = trainingsData.map((training) => {
        const trainingStaff = [];
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
        return Object.assign(Object.assign({}, training), { creator_id: training.created_by, created_by: undefined, id: training.id.toString(), training_id: training.id, team: null, title: training.topic, staff: trainingStaff });
    });
    return { users: users, trainings: trainings };
};
const processUsers = (users) => users.map((user) => (Object.assign(Object.assign({}, user), { id: user.id.toString(), user_id: user.id, avatar: undefined })));
const ExtractTrainings = (trainingsData) => {
    const extractedTrainingsData = extractTrainingsData(trainingsData);
    const users = processUsers(extractedTrainingsData.users);
    return {
        users: users,
        trainings: extractedTrainingsData.trainings,
    };
};
exports.default = ExtractTrainings;
