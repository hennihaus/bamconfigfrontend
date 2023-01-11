import type { ResResolver } from "@/__tests__/mocks/api-mocks";
import {
  internalServerErrorResResolver,
  noContentResResolver,
} from "@/__tests__/mocks/api-mocks";
import type { DefaultBodyType } from "msw";
import { rest } from "msw";
import { getInternalServerErrors } from "@/__tests__/objectmothers/errors-object-mother";

const deleteQueueByNameResResolver = (): ResResolver<DefaultBodyType> => {
  return (req, res, ctx) => {
    if (req.params["name"] !== "") {
      return res(ctx.status(204));
    }
    return res(ctx.status(500), ctx.json(getInternalServerErrors()));
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const brokerApiMocks = [
  rest.delete(
    `${import.meta.env.VITE_API_URL}/activemq`,
    internalServerErrorResResolver<DefaultBodyType>()
  ),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/activemq`,
    noContentResResolver()
  ),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/activemq/:name`,
    deleteQueueByNameResResolver()
  ),
];
