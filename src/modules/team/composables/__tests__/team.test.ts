import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { ref } from "vue";
import {
  getExampleTeam,
  getFirstTeam,
  getNonZeroStatistics,
  getZeroStatistics,
} from "@/__tests__/objectmothers/team-object-mother";
import { useTeam } from "../team";

vi.mock("@/modules/base/composables/i18n", () => ({
  useBaseI18n: vi.fn(() => ({
    t: vi.fn((key: string, plural: number) => `${key}, ${plural}`),
  })),
}));

describe("UseTeam", () => {
  describe("type", () => {
    it("should return correct message when team type = EXAMPLE", () => {
      const team = ref({ ...getExampleTeam(), type: "EXAMPLE" });

      const { type } = useTeam(team);

      expect(type.value).toBe("team.type-checkbox, 0");
    });

    it("should return correct message when team type = REGULAR", () => {
      const team = ref({ ...getFirstTeam(), type: "REGULAR" });

      const { type } = useTeam(team);

      expect(type.value).toBe("team.type-checkbox, 1");
    });

    it("should return correct message when team type = unknown", () => {
      const team = ref({ ...getFirstTeam(), type: "unknown" });

      const { type } = useTeam(team);

      expect(type.value).toBe("common.unknown, undefined");
    });
  });

  describe("totalRequests", () => {
    it("should return three when all statistics are one", () => {
      const team = ref({
        ...getFirstTeam(),
        statistics: getNonZeroStatistics(),
      });

      const { totalRequests } = useTeam(team);

      expect(totalRequests.value).toBe(3);
    });

    it("should return zero when all statistics are zero", () => {
      const team = ref({
        ...getFirstTeam(),
        statistics: getZeroStatistics(),
      });

      const { totalRequests } = useTeam(team);

      expect(totalRequests.value).toBe(0);
    });

    it("should return zero when statistics are empty", () => {
      const team = ref({ ...getFirstTeam(), statistics: {} });

      const { totalRequests } = useTeam(team);

      expect(totalRequests.value).toBe(0);
    });
  });

  describe("hasPassedStatus", () => {
    it("should return correct message when hasPassed = true", () => {
      const team = ref({ ...getFirstTeam(), hasPassed: true });

      const { hasPassedStatus } = useTeam(team);

      expect(hasPassedStatus.value).toBe("team.passed, 1");
    });

    it("should return correct message when hasPassed = false", () => {
      const team = ref({ ...getFirstTeam(), hasPassed: false });

      const { hasPassedStatus } = useTeam(team);

      expect(hasPassedStatus.value).toBe("team.passed, 0");
    });
  });

  describe("createdAt", () => {
    it("should return correct parsed date type", () => {
      const team = ref({ ...getFirstTeam() });

      const { createdAt } = useTeam(team);

      expectTypeOf<Date>(createdAt.value);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      const team = ref({ ...getFirstTeam() });

      const { updatedAt } = useTeam(team);

      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
