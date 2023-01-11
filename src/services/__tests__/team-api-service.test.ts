import { describe, expect, it } from "vitest";
import { TeamApiService } from "@/services/team-api-service";
import type { Team, Teams } from "@hennihaus/bamconfigbackend";
import {
  getFirstTeam,
  getTeamsWithEmptyFields,
  getTeamsWithNoEmptyFields,
} from "@/__tests__/objectmothers/team-object-mother";
import {
  getTeamQueryWithEmptyFields,
  getTeamQueryWithNoEmptyFields,
} from "@/__tests__/objectmothers/query-object-mother";
import { AxiosError } from "axios";

describe("TeamApiService", () => {
  const classUnderTest = new TeamApiService();

  describe("getAll", () => {
    it("should return a list of teams when only limit param is set", async () => {
      const params = getTeamQueryWithEmptyFields();

      const result: Promise<Teams> = classUnderTest.getAll(params);

      await expect(result).resolves.toStrictEqual(getTeamsWithEmptyFields());
    });

    it("should return a list of teams when max params are set", async () => {
      const params = getTeamQueryWithNoEmptyFields();

      const result: Promise<Teams> = classUnderTest.getAll(params);

      await expect(result).resolves.toStrictEqual(getTeamsWithNoEmptyFields());
    });

    it("should throw an error when server returns 400", async () => {
      const params = { cursor: "" };

      const result: Promise<Teams> = classUnderTest.getAll(params);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("getOne", () => {
    it("should return a team by uuid", async () => {
      const { uuid } = getFirstTeam();

      const result: Promise<Team> = classUnderTest.getOne(uuid);

      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";

      const result: Promise<Team> = classUnderTest.getOne(uuid);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    it("should update and return a team by uuid", async () => {
      const team = getFirstTeam();

      const result: Promise<Team> = classUnderTest.update(team);

      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      const team = { ...getFirstTeam(), uuid: "invalidUUID" };

      const result: Promise<Team> = classUnderTest.update(team);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("delete", () => {
    it("should delete a team by uuid", async () => {
      const { uuid } = getFirstTeam();

      const result: Promise<void> = classUnderTest.delete(uuid);

      await expect(result).resolves.not.toThrowError();
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";

      const result: Promise<void> = classUnderTest.delete(uuid);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("resetStatistics", () => {
    it("should reset statistics and return a team by uuid", async () => {
      const { uuid } = getFirstTeam();

      const result: Promise<Team> = classUnderTest.resetStatistics(uuid);

      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";

      const result: Promise<Team> = classUnderTest.resetStatistics(uuid);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isUsernameUnique", () => {
    it("should return true when uuid and username is unique", async () => {
      const { uuid, username } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isUsernameUnique(
        uuid,
        username
      );

      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";
      const { username } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isUsernameUnique(
        uuid,
        username
      );

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isPasswordUnique", () => {
    it("should return true when uuid and password is unique", async () => {
      const { uuid, password } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isPasswordUnique(
        uuid,
        password
      );

      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";
      const { password } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isPasswordUnique(
        uuid,
        password
      );

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isJmsQueueUnique", () => {
    it("should return true when uuid and jmsQueue is unique", async () => {
      const { uuid, jmsQueue } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isJmsQueueUnique(
        uuid,
        jmsQueue
      );

      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";
      const { jmsQueue } = getFirstTeam();

      const result: Promise<boolean> = classUnderTest.isJmsQueueUnique(
        uuid,
        jmsQueue
      );

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
