import type { Student, Team } from "@hennihaus/bamconfigbackend";
import { v4 as uuid } from "uuid";
import { TeamType } from "@/models/team-type";

export const createEmptyTeam = (): Team => ({
  uuid: uuid(),
  type: TeamType.REGULAR,
  username: "",
  password: "",
  jmsQueue: "",
  students: [createEmptyStudent()],
  statistics: {},
  hasPassed: false,
});

export const createEmptyStudent = (): Student => ({
  uuid: uuid(),
  firstname: "",
  lastname: "",
});
