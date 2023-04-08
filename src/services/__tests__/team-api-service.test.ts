import { beforeEach, describe, expect, it } from "vitest";
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
import {
  getAllTeamsRestHandler,
  getDeleteTeamRestHandler,
  getIsJmsQueueUniqueRestHandler,
  getIsPasswordUniqueRestHandler,
  getIsUsernameUniqueRestHandler,
  getOneTeamRestHandler,
  getResetStatisticsRestHandler,
  getUpdateTeamRestHandler,
} from "@/__tests__/mocks/team-api-mocks";
import { server } from "@/__tests__/setups/setup-server";

describe("TeamApiService", () => {
  const classUnderTest = new TeamApiService();

  describe("getAll", () => {
    beforeEach(() => server.use(getAllTeamsRestHandler()));

    it("should return a list of teams when only limit param is set", async () => {
      // arrange
      const params = getTeamQueryWithEmptyFields();

      // act
      const result: Promise<Teams> = classUnderTest.getAll(params);

      // assert
      await expect(result).resolves.toStrictEqual(getTeamsWithEmptyFields());
    });

    it("should return a list of teams when max params are set", async () => {
      // arrange
      const params = getTeamQueryWithNoEmptyFields();

      // act
      const result: Promise<Teams> = classUnderTest.getAll(params);

      // assert
      await expect(result).resolves.toStrictEqual(getTeamsWithNoEmptyFields());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const params = { cursor: "" };

      // act
      const result: Promise<Teams> = classUnderTest.getAll(params);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("getOne", () => {
    beforeEach(() => server.use(getOneTeamRestHandler()));

    it("should return a team by uuid", async () => {
      // arrange
      const { uuid } = getFirstTeam();

      // act
      const result: Promise<Team> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";

      // act
      const result: Promise<Team> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    beforeEach(() => server.use(getUpdateTeamRestHandler()));

    it("should update and return a team by uuid", async () => {
      // arrange
      const team = getFirstTeam();

      // act
      const result: Promise<Team> = classUnderTest.update(team);

      // assert
      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const team = { ...getFirstTeam(), uuid: "invalidUUID" };

      // act
      const result: Promise<Team> = classUnderTest.update(team);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("delete", () => {
    beforeEach(() => server.use(getDeleteTeamRestHandler()));

    it("should delete a team by uuid", async () => {
      // arrange
      const { uuid } = getFirstTeam();

      // act
      const result: Promise<void> = classUnderTest.delete(uuid);

      // assert
      await expect(result).resolves.not.toThrowError();
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";

      // act
      const result: Promise<void> = classUnderTest.delete(uuid);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("resetStatistics", () => {
    beforeEach(() => server.use(getResetStatisticsRestHandler()));

    it("should reset statistics and return a team by uuid", async () => {
      // arrange
      const { uuid } = getFirstTeam();

      // act
      const result: Promise<Team> = classUnderTest.resetStatistics(uuid);

      // assert
      await expect(result).resolves.toStrictEqual(getFirstTeam());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";

      // act
      const result: Promise<Team> = classUnderTest.resetStatistics(uuid);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isUsernameUnique", () => {
    beforeEach(() => server.use(getIsUsernameUniqueRestHandler()));

    it("should return true when uuid and username is unique", async () => {
      // arrange
      const { uuid, username } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isUsernameUnique(
        uuid,
        username
      );

      // assert
      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";
      const { username } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isUsernameUnique(
        uuid,
        username
      );

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isPasswordUnique", () => {
    beforeEach(() => server.use(getIsPasswordUniqueRestHandler()));

    it("should return true when uuid and password is unique", async () => {
      // arrange
      const { uuid, password } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isPasswordUnique(
        uuid,
        password
      );

      // assert
      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";
      const { password } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isPasswordUnique(
        uuid,
        password
      );

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isJmsQueueUnique", () => {
    beforeEach(() => server.use(getIsJmsQueueUniqueRestHandler()));

    it("should return true when uuid and jmsQueue is unique", async () => {
      // arrange
      const { uuid, jmsQueue } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isJmsQueueUnique(
        uuid,
        jmsQueue
      );

      // assert
      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";
      const { jmsQueue } = getFirstTeam();

      // act
      const result: Promise<boolean> = classUnderTest.isJmsQueueUnique(
        uuid,
        jmsQueue
      );

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
