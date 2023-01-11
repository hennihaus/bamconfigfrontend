import { describe, expect, it } from "vitest";
import { BrokerApiService } from "@/services/broker-api-service";
import { AxiosError } from "axios";
import { getFirstTeam } from "@/__tests__/objectmothers/team-object-mother";

describe("BrokerApiService", () => {
  const classUnderTest = new BrokerApiService();

  describe("resetBroker", () => {
    it("should throw an error when server returns 500", async () => {
      const result: Promise<void> = classUnderTest.resetBroker();

      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should reset the broker", async () => {
      const result: Promise<void> = classUnderTest.resetBroker();

      await expect(result).resolves.not.toThrowError();
    });
  });

  describe("deleteQueueByName", () => {
    it("should delete a queue by name", async () => {
      const { jmsQueue: name } = getFirstTeam();

      const result: Promise<void> = classUnderTest.deleteQueueByName(name);

      await expect(result).resolves.not.toThrowError();
    });
  });
});
