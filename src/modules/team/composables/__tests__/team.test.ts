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
      // arrange
      const team = ref({ ...getExampleTeam(), type: "EXAMPLE" });

      // act
      const { type } = useTeam(team);

      // assert
      expect(type.value).toBe("team.type-checkbox, 0");
    });

    it("should return correct message when team type = REGULAR", () => {
      // arrange
      const team = ref({ ...getFirstTeam(), type: "REGULAR" });

      // act
      const { type } = useTeam(team);

      // assert
      expect(type.value).toBe("team.type-checkbox, 1");
    });

    it("should return correct message when team type = unknown", () => {
      // arrange
      const team = ref({ ...getFirstTeam(), type: "unknown" });

      // act
      const { type } = useTeam(team);

      // assert
      expect(type.value).toBe("common.unknown, undefined");
    });
  });

  describe("totalRequests", () => {
    it("should return three when all statistics are one", () => {
      // arrange
      const team = ref({
        ...getFirstTeam(),
        statistics: getNonZeroStatistics(),
      });

      // act
      const { totalRequests } = useTeam(team);

      // assert
      expect(totalRequests.value).toBe(3);
    });

    it("should return zero when all statistics are zero", () => {
      // arrange
      const team = ref({
        ...getFirstTeam(),
        statistics: getZeroStatistics(),
      });

      // act
      const { totalRequests } = useTeam(team);

      // assert
      expect(totalRequests.value).toBe(0);
    });

    it("should return zero when statistics are empty", () => {
      // arrange
      const team = ref({ ...getFirstTeam(), statistics: {} });

      // act
      const { totalRequests } = useTeam(team);

      // assert
      expect(totalRequests.value).toBe(0);
    });
  });

  describe("hasPassedStatus", () => {
    it("should return correct message when hasPassed = true", () => {
      // arrange
      const team = ref({ ...getFirstTeam(), hasPassed: true });

      // act
      const { hasPassedStatus } = useTeam(team);

      // assert
      expect(hasPassedStatus.value).toBe("team.passed, 1");
    });

    it("should return correct message when hasPassed = false", () => {
      // arrange
      const team = ref({ ...getFirstTeam(), hasPassed: false });

      // act
      const { hasPassedStatus } = useTeam(team);

      // assert
      expect(hasPassedStatus.value).toBe("team.passed, 0");
    });
  });

  describe("createdAt", () => {
    it("should return correct parsed date type", () => {
      // arrange
      const team = ref({ ...getFirstTeam() });

      // act
      const { createdAt } = useTeam(team);

      // assert
      expectTypeOf<Date>(createdAt.value);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      // arrange
      const team = ref({ ...getFirstTeam() });

      // act
      const { updatedAt } = useTeam(team);

      // assert
      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
