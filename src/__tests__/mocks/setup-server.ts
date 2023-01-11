import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { teamApiMocks } from "@/__tests__/mocks/team-api-mocks";
import { bankApiMocks } from "@/__tests__/mocks/bank-api-mocks";
import { taskApiMocks } from "@/__tests__/mocks/task-api-mocks";
import { statisticApiMocks } from "@/__tests__/mocks/statistic-api-mocks";
import { brokerApiMocks } from "@/__tests__/mocks/broker-api-mocks";

const handlers = [
  ...teamApiMocks,
  ...bankApiMocks,
  ...taskApiMocks,
  ...statisticApiMocks,
  ...brokerApiMocks,
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.restoreHandlers();
  server.close();
});
