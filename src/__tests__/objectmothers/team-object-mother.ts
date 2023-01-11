import type { Student, Team, Teams } from "@hennihaus/bamconfigbackend";
import {
  getFirstStudent,
  getSecondStudent,
  getThirdStudent,
} from "./student-object-mother";
import type { Statistics } from "@/modules/team/services/statistic-service";
import {
  getTeamPaginationWithEmptyFields,
  getTeamPaginationWithNoEmptyFields,
} from "@/__tests__/objectmothers/pagination-object-mother";
import {
  getTeamQueryWithEmptyFields,
  getTeamQueryWithNoEmptyFields,
} from "@/__tests__/objectmothers/query-object-mother";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";

const getDefaultStudents = (): Student[] => [
  getFirstStudent(),
  getSecondStudent(),
  getThirdStudent(),
];

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getZeroStatistics = (): Statistics => ({
  [getSchufaBank().name]: 0,
  [getSyncBank().name]: 0,
  [getAsyncBank().name]: 0,
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getNonZeroStatistics = (): Statistics => ({
  [getSchufaBank().name]: 1,
  [getSyncBank().name]: 1,
  [getAsyncBank().name]: 1,
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFirstTeam = (): Team => ({
  uuid: "63701a57-91b8-40d4-b4e2-b8dd9e7a75a5",
  type: "REGULAR",
  username: "Team01",
  password: "OOfKqWksmA",
  jmsQueue: "ResponseQueueTeam01",
  students: getDefaultStudents(),
  statistics: getZeroStatistics(),
  hasPassed: false,
  createdAt: "2022-12-26T08:49:22",
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSecondTeam = (): Team => ({
  uuid: "c4a2dd22-f3d4-4de2-9fe0-dbe70062bef9",
  type: "REGULAR",
  username: "Team02",
  password: "OOfKqWksmA",
  jmsQueue: "ResponseQueueTeam02",
  students: getDefaultStudents(),
  statistics: getZeroStatistics(),
  hasPassed: false,
  createdAt: "2022-12-26T08:49:22",
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getThirdTeam = (): Team => ({
  uuid: "40226a72-b520-4f84-b806-b3ab30ff1769",
  type: "REGULAR",
  username: "Team03",
  password: "OOfKqWksmA",
  jmsQueue: "ResponseQueueTeam03",
  students: getDefaultStudents(),
  statistics: getZeroStatistics(),
  hasPassed: false,
  createdAt: "2022-12-26T08:49:22",
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getExampleTeam = (): Team => ({
  uuid: "9426de16-95b9-4250-b22f-6d1d6d9b8d7e",
  type: "EXAMPLE",
  username: "Beispielteam",
  password: "OOfKqWksmA",
  jmsQueue: "ResponseQueueBeispielteam",
  students: getDefaultStudents(),
  statistics: getZeroStatistics(),
  hasPassed: false,
  createdAt: "2022-12-26T08:49:22",
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamsWithNoEmptyFields = (): Teams => ({
  pagination: getTeamPaginationWithNoEmptyFields(),
  query: getTeamQueryWithNoEmptyFields(),
  items: [getExampleTeam(), getFirstTeam(), getSecondTeam(), getThirdTeam()],
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamsWithEmptyFields = (): Teams => ({
  pagination: getTeamPaginationWithEmptyFields(),
  query: getTeamQueryWithEmptyFields(),
  items: [getExampleTeam(), getFirstTeam(), getSecondTeam(), getThirdTeam()],
});
