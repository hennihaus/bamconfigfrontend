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
      const bank = ref({ ...getSchufaBank(), isActive: true });

      const { activeStatus } = useBank(bank);

      expect(activeStatus.value).toBe("bank.active-status, 1");
    });

    it("should return correct message when isActive = false", () => {
      const bank = ref({ ...getSchufaBank(), isActive: false });

      const { activeStatus } = useBank(bank);

      expect(activeStatus.value).toBe("bank.active-status, 0");
    });
  });

  describe("asyncStatus", () => {
    it("should return correct message when isAsync = true", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: true });

      const { asyncStatus } = useBank(bank);

      expect(asyncStatus.value).toBe("bank.async-status, 1");
    });

    it("should return correct message when isAsync = false", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: false });

      const { asyncStatus } = useBank(bank);

      expect(asyncStatus.value).toBe("bank.async-status, 0");
    });
  });

  describe("isAsyncBankActive", () => {
    it("should return true when bank is async = true and active = true", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: true });

      const { isAsyncBankActive } = useBank(bank);

      expect(isAsyncBankActive.value).toBe(true);
    });

    it("should return false when bank is async = false and active = true", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: false, isActive: true });

      const { isAsyncBankActive } = useBank(bank);

      expect(isAsyncBankActive.value).toBe(false);
    });

    it("should return false when bank is async = true and active = false", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: false });

      const { isAsyncBankActive } = useBank(bank);

      expect(isAsyncBankActive.value).toBe(false);
    });
  });

  describe("isAsyncBankNotActive", () => {
    it("should return true when bank is async = true and active = false", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: false });

      const { isAsyncBankNotActive } = useBank(bank);

      expect(isAsyncBankNotActive.value).toBe(true);
    });

    it("should return false when bank is async = true and active = true", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: true, isActive: true });

      const { isAsyncBankNotActive } = useBank(bank);

      expect(isAsyncBankNotActive.value).toBe(false);
    });

    it("should return false when bank is async = false and active = false", () => {
      const bank = ref({ ...getSchufaBank(), isAsync: false, isActive: false });

      const { isAsyncBankNotActive } = useBank(bank);

      expect(isAsyncBankNotActive.value).toBe(false);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      const bank = ref({ ...getSchufaBank() });

      const { updatedAt } = useBank(bank);

      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
