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

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const teamApiMocks = [
  rest.get(
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
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    getOneResResolver(getFirstTeam())
  ),
  rest.put(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    updateResResolver(getFirstTeam())
  ),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/teams/:uuid`,
    deleteResResolver()
  ),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/statistics`,
    getOneResResolver(getFirstTeam())
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/username/:username`,
    isUniqueResResolver()
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/password/:password`,
    isUniqueResResolver()
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/teams/:uuid/unique/jmsQueue/:jmsQueue`,
    isUniqueResResolver()
  ),
];
