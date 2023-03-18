import type { DefaultBodyType } from "msw";
import { rest } from "msw";
import { validate as uuidValidate } from "uuid";
import type { ResResolver } from "@/__tests__/mocks/api-mocks";
import { getBadRequestErrors } from "@/__tests__/objectmothers/errors-object-mother";

const bankIdResResolver = (): ResResolver<DefaultBodyType> => {
  return (req, res, ctx) => {
    if (uuidValidate(req.params["bankId"])) {
      return res(ctx.status(204));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

const limitResResolver = (): ResResolver<DefaultBodyType> => {
  return (req, res, ctx) => {
    if (+req.params["limit"] <= Number.MAX_SAFE_INTEGER) {
      return res(ctx.status(204));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getUpdateStatisticsRestHandler = () => {
  return rest.put(
    `${import.meta.env.VITE_API_URL}/statistics/:bankId`,
    bankIdResResolver()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDeleteStatisticsRestHandler = () => {
  return rest.delete(
    `${import.meta.env.VITE_API_URL}/statistics/:bankId`,
    bankIdResResolver()
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getRecreateStatisticsRestHandler = () => {
  return rest.post(
    `${import.meta.env.VITE_API_URL}/statistics/:limit`,
    limitResResolver()
  );
};
