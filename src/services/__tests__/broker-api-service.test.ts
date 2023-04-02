import { beforeEach, describe, expect, it } from "vitest";
import { BrokerApiService } from "@/services/broker-api-service";
import { AxiosError } from "axios";
import { getFirstTeam } from "@/__tests__/objectmothers/team-object-mother";
import {
  getDeleteQueueByNameRestHandler,
  getResetBrokerErrorRestHandler,
  getResetBrokerRestHandler,
} from "@/__tests__/mocks/broker-api-mocks";
import { server } from "@/__tests__/setups/setup-server";

describe("BrokerApiService", () => {
  const classUnderTest = new BrokerApiService();

  describe("resetBroker", () => {
    beforeEach(() => server.use());

    it("should throw an error when server returns 500", async () => {
      server.use(getResetBrokerErrorRestHandler());

      const result: Promise<void> = classUnderTest.resetBroker();

      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should reset the broker", async () => {
      server.use(getResetBrokerRestHandler());

      const result: Promise<void> = classUnderTest.resetBroker();

      await expect(result).resolves.not.toThrowError();
    });
  });

  describe("deleteQueueByName", () => {
    beforeEach(() => server.use(getDeleteQueueByNameRestHandler()));

    it("should delete a queue by name", async () => {
      const { jmsQueue: name } = getFirstTeam();

      const result: Promise<void> = classUnderTest.deleteQueueByName(name);

      await expect(result).resolves.not.toThrowError();
    });
  });
});
