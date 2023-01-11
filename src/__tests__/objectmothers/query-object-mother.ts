import type { TeamQuery } from "@hennihaus/bamconfigbackend";
import { getFirstTeam } from "./team-object-mother";
import { getFirstStudent } from "./student-object-mother";
import type { TeamFormQuery } from "@/modules/team/services/query-service";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";

const getBanks = (): string[] => [
  getSchufaBank().name,
  getSyncBank().name,
  getAsyncBank().name,
];

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamQueryWithNoEmptyFields = (): TeamQuery => ({
  limit: 1,
  type: "REGULAR",
  username: getFirstTeam().username,
  password: getFirstTeam().password,
  jmsQueue: getFirstTeam().jmsQueue,
  hasPassed: getFirstTeam().hasPassed,
  minRequests: 1,
  maxRequests: Number.MAX_SAFE_INTEGER,
  studentFirstname: getFirstStudent().firstname,
  studentLastname: getFirstStudent().lastname,
  banks: getBanks(),
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamQueryWithEmptyFields = (): TeamQuery => ({ limit: 1 });

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamFormQueryWithNoEmptyFields = (): TeamFormQuery => ({
  ...getTeamQueryWithNoEmptyFields(),
  hasPassed: "NOT_PASSED",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTeamFormQueryWithEmptyFields = (): TeamFormQuery => ({});
