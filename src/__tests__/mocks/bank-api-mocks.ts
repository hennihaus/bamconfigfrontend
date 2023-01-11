import { rest } from "msw";
import {
  getAllResResolver,
  getOneResResolver,
  internalServerErrorResResolver,
  updateResResolver,
} from "@/__tests__/mocks/api-mocks";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";
import type { Bank } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const bankApiMocks = [
  rest.get(
    `${import.meta.env.VITE_API_URL}/banks`,
    internalServerErrorResResolver<Bank[]>()
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/banks`,
    getAllResResolver([getSchufaBank(), getSyncBank(), getAsyncBank()])
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/banks/:uuid`,
    getOneResResolver(getSchufaBank())
  ),
  rest.patch(
    `${import.meta.env.VITE_API_URL}/banks/:uuid`,
    updateResResolver(getSchufaBank())
  ),
];
