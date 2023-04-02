import { validate as uuidValidate } from "uuid";
import {
  getBadRequestErrors,
  getInternalServerErrors,
} from "@/__tests__/objectmothers/errors-object-mother";
import type {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";
import type { Errors } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export type ResResolver<ResponseBody extends DefaultBodyType> = ResponseResolver<
  RestRequest<DefaultBodyType, PathParams<any>>,
  RestContext,
  ResponseBody | Errors
>;

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export type Request = RestRequest<DefaultBodyType, PathParams<never>>;

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAllResResolver = <T>(responseBody: T[]): ResResolver<T[]> => {
  return (_, res, ctx) => res(ctx.json(responseBody));
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getOneResResolver = <T extends DefaultBodyType>(responseBody: T): ResResolver<T> => {
  return (req, res, ctx) => {
    if (uuidValidate(req.params["uuid"])) {
      return res(ctx.json(responseBody));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const updateResResolver = <T extends DefaultBodyType>(responseBody: T): ResResolver<T> => {
  return async (req, res, ctx) => {
    if (uuidValidate(req.params["uuid"]) && (await req.json<T>())) {
      return res(ctx.json(responseBody));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const deleteResResolver = (): ResResolver<DefaultBodyType> => {
  return (req, res, ctx) => {
    if (uuidValidate(req.params["uuid"])) {
      return res(ctx.status(204));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const isUniqueResResolver = (): ResResolver<{ isUnique: boolean }> => {
  return (req, res, ctx) => {
    if (uuidValidate(req.params["uuid"])) {
      return res(ctx.json({ isUnique: true }));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getPaginationResResolver = <T extends DefaultBodyType>(
  responseBodyWithEmptyFields: T,
  responseBodyWithNoEmptyFields: T,
  hasRequestParamsWithNoEmptyField: (req: Request) => Boolean
): ResResolver<T> => {
  return (req, res, ctx) => {
    if (hasRequestParamsWithNoEmptyField(req)) {
      return res(ctx.json(responseBodyWithNoEmptyFields));
    }
    if (req.url.searchParams.get("limit")) {
      return res(ctx.json(responseBodyWithEmptyFields));
    }
    return res(ctx.status(400), ctx.json(getBadRequestErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const noContentResResolver = (): ResResolver<DefaultBodyType> => {
  return (_, res, ctx) => res(ctx.status(204));
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const internalServerErrorResResolver = <T extends DefaultBodyType>(): ResResolver<T> => {
  return (_, res, ctx) =>
    res.once(ctx.status(500), ctx.json(getInternalServerErrors()));
};
