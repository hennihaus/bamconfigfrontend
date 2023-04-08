import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { ref } from "vue";
import { getSchufaBank } from "@/__tests__/objectmothers/bank-object-mother";
import { useBank } from "@/modules/bank/composables/bank";

vi.mock("@/modules/base/composables/i18n", () => ({
  useBaseI18n: vi.fn(() => ({
    t: vi.fn((key: string, plural: number) => `${key}, ${plural}`),
  })),
}));

describe("UseBank", () => {
  describe("activeStatus", () => {
    it("should return correct message when isActive = true", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isActive: true });

      // act
      const { activeStatus } = useBank(bank);

      // assert
      expect(activeStatus.value).toBe("bank.active-status, 1");
    });

    it("should return correct message when isActive = false", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isActive: false });

      // act
      const { activeStatus } = useBank(bank);

      // assert
      expect(activeStatus.value).toBe("bank.active-status, 0");
    });
  });

  describe("asyncStatus", () => {
    it("should return correct message when isAsync = true", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: true });

      // act
      const { asyncStatus } = useBank(bank);

      // assert
      expect(asyncStatus.value).toBe("bank.async-status, 1");
    });

    it("should return correct message when isAsync = false", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: false });

      // act
      const { asyncStatus } = useBank(bank);

      // assert
      expect(asyncStatus.value).toBe("bank.async-status, 0");
    });
  });

  describe("isAsyncBankActive", () => {
    it("should return true when bank is async = true and active = true", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: true });

      // act
      const { isAsyncBankActive } = useBank(bank);

      // assert
      expect(isAsyncBankActive.value).toBe(true);
    });

    it("should return false when bank is async = false and active = true", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: false, isActive: true });

      // act
      const { isAsyncBankActive } = useBank(bank);

      // assert
      expect(isAsyncBankActive.value).toBe(false);
    });

    it("should return false when bank is async = true and active = false", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: false });

      // act
      const { isAsyncBankActive } = useBank(bank);

      // assert
      expect(isAsyncBankActive.value).toBe(false);
    });
  });

  describe("isAsyncBankNotActive", () => {
    it("should return true when bank is async = true and active = false", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: false });

      // act
      const { isAsyncBankNotActive } = useBank(bank);

      // assert
      expect(isAsyncBankNotActive.value).toBe(true);
    });

    it("should return false when bank is async = true and active = true", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: true });

      // act
      const { isAsyncBankNotActive } = useBank(bank);

      // assert
      expect(isAsyncBankNotActive.value).toBe(false);
    });

    it("should return false when bank is async = false and active = false", () => {
      // arrange
      const bank = ref({ ...getSchufaBank(), isAsync: false, isActive: false });

      // act
      const { isAsyncBankNotActive } = useBank(bank);

      // assert
      expect(isAsyncBankNotActive.value).toBe(false);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      // arrange
      const bank = ref({ ...getSchufaBank() });

      // act
      const { updatedAt } = useBank(bank);

      // assert
      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
