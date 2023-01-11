import { describe, expect, it } from "vitest";
import { TaskApiService } from "@/services/task-api-service";
import type { Task } from "@hennihaus/bamconfigbackend";
import { AxiosError } from "axios";
import {
  getAsynchronousBankTask,
  getSchufaTask,
  getSynchronousBankTask,
} from "@/__tests__/objectmothers/task-object-mother";

describe("TaskApiService", () => {
  const classUnderTest = new TaskApiService();

  describe("getAll", () => {
    it("should throw an error when server returns 500", async () => {
      const result: Promise<Task[]> = classUnderTest.getAll();

      await expect(result).rejects.toThrowError(AxiosError);
    });

    it("should return a list of tasks", async () => {
      const result: Promise<Task[]> = classUnderTest.getAll();

      await expect(result).resolves.toStrictEqual([
        getSchufaTask(),
        getSynchronousBankTask(),
        getAsynchronousBankTask(),
      ]);
    });
  });

  describe("getOne", () => {
    it("should return a task by uuid", async () => {
      const { uuid } = getSchufaTask();

      const result: Promise<Task> = classUnderTest.getOne(uuid);

      await expect(result).resolves.toStrictEqual(getSchufaTask());
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";

      const result: Promise<Task> = classUnderTest.getOne(uuid);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("update", () => {
    it("should update and return a task by uuid", async () => {
      const task = getSchufaTask();

      const result: Promise<Task> = classUnderTest.update(task);

      await expect(result).resolves.toStrictEqual(getSchufaTask());
    });

    it("should throw an error when server returns 400", async () => {
      const task = { ...getSchufaTask(), uuid: "invalidUUID" };

      const result: Promise<Task> = classUnderTest.update(task);

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });

  describe("isTitleUnique", () => {
    it("should return true when uuid and title is unique", async () => {
      const { uuid, title } = getSchufaTask();

      const result: Promise<boolean> = classUnderTest.isTitleUnique(
        uuid,
        title
      );

      await expect(result).resolves.toBe(true);
    });

    it("should throw an error when server returns 400", async () => {
      const uuid = "invalidUUID";
      const { title } = getSchufaTask();

      const result: Promise<boolean> = classUnderTest.isTitleUnique(
        uuid,
        title
      );

      await expect(result).rejects.toThrowError(AxiosError);
    });
  });
});
