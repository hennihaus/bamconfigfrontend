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
      // arrange
      server.use(getResetBrokerErrorRestHandler());

      // act
      const result: Promise<void> = classUnderTest.resetBroker();

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should reset the broker", async () => {
      // arrange
      server.use(getResetBrokerRestHandler());

      // act
      const result: Promise<void> = classUnderTest.resetBroker();

      // assert
      await expect(result).resolves.not.toThrowError();
    });
  });

  describe("deleteQueueByName", () => {
    beforeEach(() => server.use(getDeleteQueueByNameRestHandler()));

    it("should delete a queue by name", async () => {
      // arrange
      const { jmsQueue: name } = getFirstTeam();

      // act
      const result: Promise<void> = classUnderTest.deleteQueueByName(name);

      // assert
      await expect(result).resolves.not.toThrowError();
    });
  });
});
