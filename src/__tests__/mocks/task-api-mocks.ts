import { rest } from "msw";
import {
  getAllResResolver,
  getOneResResolver,
  internalServerErrorResResolver,
  isUniqueResResolver,
  updateResResolver,
} from "@/__tests__/mocks/api-mocks";
import type { Task } from "@hennihaus/bamconfigbackend";
import {
  getAsynchronousBankTask,
  getSchufaTask,
  getSynchronousBankTask,
} from "@/__tests__/objectmothers/task-object-mother";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const taskApiMocks = [
  rest.get(
    `${import.meta.env.VITE_API_URL}/tasks`,
    internalServerErrorResResolver<Task[]>()
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/tasks`,
    getAllResResolver([
      getSchufaTask(),
      getSynchronousBankTask(),
      getAsynchronousBankTask(),
    ])
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid`,
    getOneResResolver(getSchufaTask())
  ),
  rest.patch(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid`,
    updateResResolver(getSchufaTask())
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid/unique/title/:title`,
    isUniqueResResolver()
  ),
];
