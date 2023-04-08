import { beforeEach, describe, expect, it } from "vitest";
import { TaskApiService } from "@/services/task-api-service";
import type { Task } from "@hennihaus/bamconfigbackend";
import { AxiosError } from "axios";
import {
  getAsynchronousBankTask,
  getSchufaTask,
  getSynchronousBankTask,
} from "@/__tests__/objectmothers/task-object-mother";
import {
  getAllTasksErrorRestHandler,
  getAllTasksRestHandler,
  getIsTitleUniqueRestHandler,
  getOneTaskRestHandler,
  getUpdateTaskRestHandler,
} from "@/__tests__/mocks/task-api-mocks";
import { server } from "@/__tests__/setups/setup-server";

describe("TaskApiService", () => {
  const classUnderTest = new TaskApiService();

  describe("getAll", () => {
    it("should throw an error when server returns 500", async () => {
      // arrange
      server.use(getAllTasksErrorRestHandler());

      // act
      const result: Promise<Task[]> = classUnderTest.getAll();

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should return a list of tasks", async () => {
      // arrange
      server.use(getAllTasksRestHandler());

      // act
      const result: Promise<Task[]> = classUnderTest.getAll();

      // assert
      await expect(result).resolves.toStrictEqual([
        getSchufaTask(),
        getSynchronousBankTask(),
        getAsynchronousBankTask(),
      ]);
    });
  });

  describe("getOne", () => {
    beforeEach(() => server.use(getOneTaskRestHandler()));

    it("should return a task by uuid", async () => {
      // arrange
      const { uuid } = getSchufaTask();

      // act
      const result: Promise<Task> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).resolves.toStrictEqual(getSchufaTask());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";

      // act
      const result: Promise<Task> = classUnderTest.getOne(uuid);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    beforeEach(() => server.use(getUpdateTaskRestHandler()));

    it("should update and return a task by uuid", async () => {
      // arrange
      const task = getSchufaTask();

      // act
      const result: Promise<Task> = classUnderTest.update(task);

      // assert
      await expect(result).resolves.toStrictEqual(getSchufaTask());
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const task = { ...getSchufaTask(), uuid: "invalidUUID" };

      // act
      const result: Promise<Task> = classUnderTest.update(task);

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isTitleUnique", () => {
    beforeEach(() => server.use(getIsTitleUniqueRestHandler()));

    it("should return true when uuid and title is unique", async () => {
      // arrange
      const { uuid, title } = getSchufaTask();

      // act
      const result: Promise<boolean> = classUnderTest.isTitleUnique(
        uuid,
        title
      );

      // assert
      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      // arrange
      const uuid = "invalidUUID";
      const { title } = getSchufaTask();

      // act
      const result: Promise<boolean> = classUnderTest.isTitleUnique(
        uuid,
        title
      );

      // assert
      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
