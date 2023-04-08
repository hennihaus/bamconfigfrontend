import { beforeEach, describe, expect, it } from "vitest";
import { BankApiService } from "@/services/bank-api-service";
import type { Bank } from "@hennihaus/bamconfigbackend";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";
import { AxiosError } from "axios";
import {
  getAllBanksErrorRestHandler,
  getAllBanksRestHandler,
  getOneBankRestHandler,
  getUpdateBankRestHandler,
} from "@/__tests__/mocks/bank-api-mocks";
import { server } from "@/__tests__/setups/setup-server";

describe("BankApiService", () => {
  const classUnderTest = new BankApiService();

  describe("getAll", () => {
    it("should throw an error when server returns 500", async () => {
      // arrange
      server.use(getAllBanksErrorRestHandler());

      // act
      const result: Promise<Bank[]> = classUnderTest.getAll();

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should return a list of banks", async () => {
      // arrange
      server.use(getAllBanksRestHandler());

      // act
      const result: Promise<Bank[]> = classUnderTest.getAll();

      // assert
      await expect(result).resolves.toStrictEqual([
        getSchufaBank(),
        getSyncBank(),
        getAsyncBank(),
      ]);
    });
  });

  describe("getOne", () => {
    beforeEach(() => server.use(getOneBankRestHandler()));

    it("should return a bank by uuid", async () => {
      // arrange
      const { uuid } = getSchufaBank();

      // act
      const result: Promise<Bank> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).resolves.toStrictEqual(getSchufaBank());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";

      // act
      const result: Promise<Bank> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    beforeEach(() => server.use(getUpdateBankRestHandler()));

    it("should update and return a bank by uuid", async () => {
      // arrange
      const bank = getSchufaBank();

      // act
      const result: Promise<Bank> = classUnderTest.update(bank);

      // assert
      await expect(result).resolves.toStrictEqual(getSchufaBank());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const bank = { ...getSchufaBank(), uuid: "invalidUUID" };

      // act
      const result: Promise<Bank> = classUnderTest.update(bank);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
