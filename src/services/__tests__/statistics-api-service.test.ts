import { describe, expect, it } from "vitest";
import { StatisticApiService } from "@/services/statistic-api-service";
import { getSchufaBank } from "@/__tests__/objectmothers/bank-object-mother";
import { AxiosError } from "axios";
import { getTeamQueryWithNoEmptyFields } from "@/__tests__/objectmothers/query-object-mother";

describe("StatisticApiService", () => {
  const classUnderTest = new StatisticApiService();

  describe("saveAll", () => {
    it("should save all statistics by bankId", async () => {
      const { uuid: bankId } = getSchufaBank();

      const result: Promise<void> = classUnderTest.saveAll(bankId);

      await expect(result).resolves.not.toThrowError();
    });

    it("should throw an error when server returns 400", async () => {
      const bankId = "invalidUUID";

      const result: Promise<void> = classUnderTest.saveAll(bankId);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("deleteAll", () => {
    it("should delete all statistics by bankId", async () => {
      const { uuid: bankId } = getSchufaBank();

      const result: Promise<void> = classUnderTest.deleteAll(bankId);

      await expect(result).resolves.not.toThrowError();
    });

    it("should throw an error when server returns 400", async () => {
      const bankId = "invalidUUID";

      const result: Promise<void> = classUnderTest.deleteAll(bankId);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("recreateAll", () => {
    it("should recreate all statistics for all banks with a limit", async () => {
      const { limit } = getTeamQueryWithNoEmptyFields();

      const result: Promise<void> = classUnderTest.recreateAll(limit);

      await expect(result).resolves.not.toThrowError();
    });

    it("should throw an error when server returns 400", async () => {
      const invalidLimit = Number.MAX_SAFE_INTEGER + 1;

      const result: Promise<void> = classUnderTest.recreateAll(invalidLimit);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
