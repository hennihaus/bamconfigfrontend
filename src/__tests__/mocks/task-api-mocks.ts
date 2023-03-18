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
export const getAllTasksErrorRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/tasks`,
    internalServerErrorResResolver<Task[]>()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAllTasksRestHandler = (
  responseBody: Task[] = [
    getSchufaTask(),
    getSynchronousBankTask(),
    getAsynchronousBankTask(),
  ]
) => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/tasks`,
    getAllResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getOneTaskRestHandler = (responseBody: Task = getSchufaTask()) => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid`,
    getOneResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getUpdateTaskRestHandler = (
  responseBody: Task = getSchufaTask()
) => {
  return rest.patch(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid`,
    updateResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getIsTitleUniqueRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/tasks/:uuid/unique/title/:title`,
    isUniqueResResolver()
  );
};
