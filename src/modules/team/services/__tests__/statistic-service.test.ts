import { describe, expect, it } from "vitest";
import { getFirstTeam } from "@/__tests__/objectmothers/team-object-mother";
import type { Statistics } from "../statistic-service";
import { mergeStatistics, removeStatistics } from "../statistic-service";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";

describe("StatisticService", () => {
  describe("removeStatistics", () => {
    it("should only return statistics for async banks", () => {
      const team = {
        ...getFirstTeam(),
        statistics: {
          [getSchufaBank().name]: 1,
          [getSyncBank().name]: 1,
          [getAsyncBank().name]: 1,
        },
      };

      const result: Statistics = removeStatistics(team);

      expect(result).toStrictEqual({ [getAsyncBank().name]: 1 });
    });

    it("should return empty statistics when team has no statistics", () => {
      const team = { ...getFirstTeam(), statistics: {} };

      const result: Statistics = removeStatistics(team);

      expect(result).toStrictEqual({});
    });
  });

  describe("mergeStatistics", () => {
    it("should reassign sync banks from old team to new team", () => {
      const oldTeam = {
        ...getFirstTeam(),
        statistics: {
          [getSchufaBank().name]: 1,
          [getSyncBank().name]: 1,
          [getAsyncBank().name]: 1,
        },
      };
      const newTeam = {
        ...getFirstTeam(),
        statistics: { [getAsyncBank().name]: 1 },
      };

      const result: Statistics = mergeStatistics(newTeam, oldTeam);

      expect(result).toStrictEqual({
        [getSchufaBank().name]: 1,
        [getSyncBank().name]: 1,
        [getAsyncBank().name]: 1,
      });
    });

    it("should add new sync banks to team", () => {
      const oldTeam = {
        ...getFirstTeam(),
        statistics: {
          [getSchufaBank().name]: 1,
          [getSyncBank().name]: 1,
        },
      };
      const newTeam = {
        ...getFirstTeam(),
        statistics: { [getAsyncBank().name]: 0 },
      };

      const result: Statistics = mergeStatistics(newTeam, oldTeam);

      expect(result).toStrictEqual({
        [getSchufaBank().name]: 1,
        [getSyncBank().name]: 1,
        [getAsyncBank().name]: 0,
      });
    });

    it("should always add sync banks when new team has no statistics", () => {
      const oldTeam = {
        ...getFirstTeam(),
        statistics: {
          [getSchufaBank().name]: 0,
          [getSyncBank().name]: 0,
        },
      };
      const newTeam = { ...getFirstTeam(), statistics: {} };

      const result: Statistics = mergeStatistics(newTeam, oldTeam);

      expect(result).toStrictEqual({
        [getSchufaBank().name]: 0,
        [getSyncBank().name]: 0,
      });
    });

    it("should always add sync banks when old team is not available", () => {
      const newTeam = {
        ...getFirstTeam(),
        statistics: { [getAsyncBank().name]: 0 },
      };

      const result: Statistics = mergeStatistics(newTeam);

      expect(result).toStrictEqual({
        [getSchufaBank().name]: 0,
        [getSyncBank().name]: 0,
        [getAsyncBank().name]: 0,
      });
    });
  });
});
