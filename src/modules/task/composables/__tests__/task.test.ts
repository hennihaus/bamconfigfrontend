import { beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import * as i18n from "@/modules/base/composables/i18n";
import { ref } from "vue";
import { useTask } from "@/modules/task/composables/task";
import { getSchufaTask } from "@/__tests__/objectmothers/task-object-mother";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";

describe("UseTask", () => {
  beforeEach(() => {
    // @ts-ignore
    vi.spyOn(i18n, "useBaseI18n").mockImplementation(() => {
      return {
        t: (key: string, plural: number) => `${key}, ${plural}`,
        locale: ref("en"),
      };
    });
  });

  describe("integrationStep", () => {
    it("should return correct number with a point when locale = de", () => {
      // arrange
      // @ts-ignore
      vi.spyOn(i18n, "useBaseI18n").mockImplementationOnce(() => {
        return {
          t: (key: string, plural: number) => `${key}, ${plural}`,
          locale: ref("de"),
        };
      });
      const task = ref({ ...getSchufaTask(), integrationStep: 1 });

      // act
      const { integrationStep } = useTask(task);

      // assert
      expect(integrationStep.value).toBe("1.");
    });

    it("should return correct step when locale = en and integrationStep = 1", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), integrationStep: 1 });

      // act
      const { integrationStep } = useTask(task);

      // assert
      expect(integrationStep.value).toBe("1st");
    });

    it("should return correct step when locale = en and integrationStep = 2", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), integrationStep: 2 });

      // act
      const { integrationStep } = useTask(task);

      // assert
      expect(integrationStep.value).toBe("2nd");
    });

    it("should return correct step when locale = en and integrationStep = 3", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), integrationStep: 3 });

      // act
      const { integrationStep } = useTask(task);

      // assert
      expect(integrationStep.value).toBe("3rd");
    });

    it("should return correct step when locale = en and integrationStep > 3", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), integrationStep: 4 });

      // act
      const { integrationStep } = useTask(task);

      // assert
      expect(integrationStep.value).toBe("4th");
    });
  });

  describe("thumbnailUrl", () => {
    it("should return thumbnailUrl of first bank", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        banks: [getSchufaBank(), getSyncBank()],
      });

      // act
      const { thumbnailUrl } = useTask(task);

      // assert
      expect(thumbnailUrl.value).toBe(getSchufaBank().thumbnailUrl);
    });
  });

  describe("description", () => {
    it("should return description when length greater zero", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), description: "1" });

      // act
      const { description } = useTask(task);

      // assert
      expect(description.value).toBe("1");
    });

    it("should return no description available message when description = ''", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), description: "" });

      // act
      const { description } = useTask(task);

      // assert
      expect(description.value).toBe(
        "task.description, undefined common.available, 0"
      );
    });
  });

  describe("isAsyncTask", () => {
    it("should return true when task has async banks", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), banks: [getAsyncBank()] });

      // act
      const { isAsyncTask } = useTask(task);

      // assert
      expect(isAsyncTask.value).toBe(true);
    });

    it("should return false when task has no async banks", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), banks: [getSyncBank()] });

      // act
      const { isAsyncTask } = useTask(task);

      // assert
      expect(isAsyncTask.value).toBe(false);
    });

    it("should return false when task has no banks", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), banks: [] });

      // act
      const { isAsyncTask } = useTask(task);

      // assert
      expect(isAsyncTask.value).toBe(false);
    });
  });

  describe("hasNoAsyncBanksActivated", () => {
    it("should return false when task has no banks", () => {
      // arrange
      const task = ref({ ...getSchufaTask(), banks: [] });

      // act
      const { hasNoAsyncBanksActivated } = useTask(task);

      // assert
      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return false when task has no async banks", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        banks: [getSchufaBank(), getSyncBank()],
      });

      // act
      const { hasNoAsyncBanksActivated } = useTask(task);

      // assert
      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return false when at least one async bank is activated", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        banks: [
          { ...getAsyncBank(), isActive: false },
          { ...getAsyncBank(), isActive: true },
        ],
      });

      // act
      const { hasNoAsyncBanksActivated } = useTask(task);

      // assert
      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return true when all async banks are deactivated", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        banks: [
          { ...getAsyncBank(), isActive: false },
          { ...getSyncBank(), isActive: true },
        ],
      });

      // act
      const { hasNoAsyncBanksActivated } = useTask(task);

      // assert
      expect(hasNoAsyncBanksActivated.value).toBe(true);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      // arrange
      const task = ref({ ...getSchufaTask() });

      // act
      const { updatedAt } = useTask(task);

      // assert
      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
