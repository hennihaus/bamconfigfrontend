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
      // @ts-ignore
      vi.spyOn(i18n, "useBaseI18n").mockImplementationOnce(() => {
        return {
          t: (key: string, plural: number) => `${key}, ${plural}`,
          locale: ref("de"),
        };
      });
      const task = ref({ ...getSchufaTask(), integrationStep: 1 });

      const { integrationStep } = useTask(task);

      expect(integrationStep.value).toBe("1.");
    });

    it("should return correct step when locale = en and integrationStep = 1", () => {
      const task = ref({ ...getSchufaTask(), integrationStep: 1 });

      const { integrationStep } = useTask(task);

      expect(integrationStep.value).toBe("1st");
    });

    it("should return correct step when locale = en and integrationStep = 2", () => {
      const task = ref({ ...getSchufaTask(), integrationStep: 2 });

      const { integrationStep } = useTask(task);

      expect(integrationStep.value).toBe("2nd");
    });

    it("should return correct step when locale = en and integrationStep = 3", () => {
      const task = ref({ ...getSchufaTask(), integrationStep: 3 });

      const { integrationStep } = useTask(task);

      expect(integrationStep.value).toBe("3rd");
    });

    it("should return correct step when locale = en and integrationStep > 3", () => {
      const task = ref({ ...getSchufaTask(), integrationStep: 4 });

      const { integrationStep } = useTask(task);

      expect(integrationStep.value).toBe("4th");
    });
  });

  describe("thumbnailUrl", () => {
    it("should return thumbnailUrl of first bank", () => {
      const task = ref({
        ...getSchufaTask(),
        banks: [getSchufaBank(), getSyncBank()],
      });

      const { thumbnailUrl } = useTask(task);

      expect(thumbnailUrl.value).toBe(getSchufaBank().thumbnailUrl);
    });
  });

  describe("description", () => {
    it("should return description when length greater zero", () => {
      const task = ref({ ...getSchufaTask(), description: "1" });

      const { description } = useTask(task);

      expect(description.value).toBe("1");
    });

    it("should return no description available message when description = ''", () => {
      const task = ref({ ...getSchufaTask(), description: "" });

      const { description } = useTask(task);

      expect(description.value).toBe(
        "task.description, undefined common.available, 0"
      );
    });
  });

  describe("isAsyncTask", () => {
    it("should return true when task has async banks", () => {
      const task = ref({ ...getSchufaTask(), banks: [getAsyncBank()] });

      const { isAsyncTask } = useTask(task);

      expect(isAsyncTask.value).toBe(true);
    });

    it("should return false when task has no async banks", () => {
      const task = ref({ ...getSchufaTask(), banks: [getSyncBank()] });

      const { isAsyncTask } = useTask(task);

      expect(isAsyncTask.value).toBe(false);
    });

    it("should return false when task has no banks", () => {
      const task = ref({ ...getSchufaTask(), banks: [] });

      const { isAsyncTask } = useTask(task);

      expect(isAsyncTask.value).toBe(false);
    });
  });

  describe("hasNoAsyncBanksActivated", () => {
    it("should return false when task has no banks", () => {
      const task = ref({ ...getSchufaTask(), banks: [] });

      const { hasNoAsyncBanksActivated } = useTask(task);

      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return false when task has no async banks", () => {
      const task = ref({
        ...getSchufaTask(),
        banks: [getSchufaBank(), getSyncBank()],
      });

      const { hasNoAsyncBanksActivated } = useTask(task);

      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return false when at least one async bank is activated", () => {
      const task = ref({
        ...getSchufaTask(),
        banks: [
          { ...getAsyncBank(), isActive: false },
          { ...getAsyncBank(), isActive: true },
        ],
      });

      const { hasNoAsyncBanksActivated } = useTask(task);

      expect(hasNoAsyncBanksActivated.value).toBe(false);
    });

    it("should return true when all async banks are deactivated", () => {
      const task = ref({
        ...getSchufaTask(),
        banks: [
          { ...getAsyncBank(), isActive: false },
          { ...getSyncBank(), isActive: true },
        ],
      });

      const { hasNoAsyncBanksActivated } = useTask(task);

      expect(hasNoAsyncBanksActivated.value).toBe(true);
    });
  });

  describe("updatedAt", () => {
    it("should return correct parsed date type", () => {
      const task = ref({ ...getSchufaTask() });

      const { updatedAt } = useTask(task);

      expectTypeOf<Date>(updatedAt.value);
    });
  });
});
