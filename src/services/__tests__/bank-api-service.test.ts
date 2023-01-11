import { describe, expect, it } from "vitest";
import { BankApiService } from "@/services/bank-api-service";
import type { Bank } from "@hennihaus/bamconfigbackend";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";
import { AxiosError } from "axios";

describe("BankApiService", () => {
  const classUnderTest = new BankApiService();

  describe("getAll", () => {
    it("should throw an error when server returns 500", async () => {
      const result: Promise<Bank[]> = classUnderTest.getAll();

      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should return a list of banks", async () => {
      const result: Promise<Bank[]> = classUnderTest.getAll();

      await expect(result).resolves.toStrictEqual([
        getSchufaBank(),
        getSyncBank(),
        getAsyncBank(),
      ]);
    });
  });

  describe("getOne", () => {
    it("should return a bank by uuid", async () => {
      const { uuid } = getSchufaBank();

      const result: Promise<Bank> = classUnderTest.getOne(uuid);

      await expect(result).resolves.toStrictEqual(getSchufaBank());
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";

      const result: Promise<Bank> = classUnderTest.getOne(uuid);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    it("should update and return a bank by uuid", async () => {
      const bank = getSchufaBank();

      const result: Promise<Bank> = classUnderTest.update(bank);

      await expect(result).resolves.toStrictEqual(getSchufaBank());
    });

    it("should throw an error when server returns 400", async () => {
      const bank = { ...getSchufaBank(), uuid: "invalidUUID" };

      const result: Promise<Bank> = classUnderTest.update(bank);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
