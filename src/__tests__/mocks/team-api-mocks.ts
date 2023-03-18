import { rest } from "msw";
import {
  getFirstTeam,
  getTeamsWithEmptyFields,
  getTeamsWithNoEmptyFields,
} from "@/__tests__/objectmothers/team-object-mother";
import {
  deleteResResolver,
  getOneResResolver,
  getPaginationResResolver,
  isUniqueResResolver,
  updateResResolver,
} from "@/__tests__/mocks/api-mocks";
import type { Team } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAllTeamsRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/teams`,
    getPaginationResResolver(
      getTeamsWithEmptyFields(),
      getTeamsWithNoEmptyFields(),
      (req) => {
        return !!(
          req.url.searchParams.get("limit") &&
          req.url.searchParams.get("type") &&
          req.url.searchParams.get("username") &&
          req.url.searchParams.get("password") &&
          req.url.searchParams.get("jmsQueue") &&
          req.url.searchParams.get("hasPassed") &&
          req.url.searchParams.get("minRequests") &&
          req.url.searchParams.get("minRequests") &&
          req.url.searchParams.get("studentFirstname") &&
          req.url.searchParams.get("studentLastname") &&
          req.url.searchParams.getAll("banks").length
        );
      }
    )
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getOneTeamRestHandler = (responseBody: Team = getFirstTeam()) => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    getOneResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getUpdateTeamRestHandler = (
  responseBody: Team = getFirstTeam()
) => {
  return rest.put(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    updateResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDeleteTeamRestHandler = () => {
  return rest.delete(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    deleteResResolver()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getResetStatisticsRestHandler = (
  responseBody: Team = getFirstTeam()
) => {
  return rest.delete(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/statistics`,
    getOneResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getIsUsernameUniqueRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/username/:username`,
    isUniqueResResolver()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getIsPasswordUniqueRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/password/:password`,
    isUniqueResResolver()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getIsJmsQueueUniqueRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/jmsQueue/:jmsQueue`,
    isUniqueResResolver()
  );
};
