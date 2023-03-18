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
export const getAllBanksErrorRestHandler = () => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/banks`,
    internalServerErrorResResolver<Bank[]>()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAllBanksRestHandler = (
  responseBody: Bank[] = [getSchufaBank(), getSyncBank(), getAsyncBank()]
) => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/banks`,
    getAllResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getOneBankRestHandler = (responseBody: Bank = getSchufaBank()) => {
  return rest.get(
    `${import.meta.env.VITE_API_URL}/banks/:uuid`,
    getOneResResolver(responseBody)
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getUpdateBankRestHandler = (
  responseBody: Bank = getSchufaBank()
) => {
  return rest.patch(
    `${import.meta.env.VITE_API_URL}/banks/:uuid`,
    updateResResolver(responseBody)
  );
};
