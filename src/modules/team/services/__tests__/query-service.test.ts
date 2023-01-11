import { describe, expect, it } from "vitest";
import {
  getTeamFormQueryWithEmptyFields,
  getTeamFormQueryWithNoEmptyFields,
} from "@/__tests__/objectmothers/query-object-mother";
import type { TeamFormQuery } from "../query-service";
import { buildQuery } from "../query-service";

describe("QueryService", () => {
  describe("buildQuery", () => {
    it("should return same form query when all values are set", () => {
      const query = getTeamFormQueryWithNoEmptyFields();

      const result: TeamFormQuery = buildQuery(query);

      expect(result).toStrictEqual(query);
    });

    it("should return empty form query when no values are set", () => {
      const query = getTeamFormQueryWithEmptyFields();

      const result: TeamFormQuery = buildQuery(query);

      expect(result).toStrictEqual(query);
    });

    it("should return empty form query when all values are empty", () => {
      const query: TeamFormQuery = {
        type: "",
        username: "",
        password: "",
        jmsQueue: "",
        minRequests: 0,
        maxRequests: 0,
        studentFirstname: "",
        studentLastname: "",
        banks: [],
      };

      const result: TeamFormQuery = buildQuery(query);

      expect(result).toStrictEqual(getTeamFormQueryWithEmptyFields());
    });
  });
});
