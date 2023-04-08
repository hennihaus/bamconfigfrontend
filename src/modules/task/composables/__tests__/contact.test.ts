import { describe, expect, it } from "vitest";
import { ref } from "vue";
import {
  getDefaultContact,
  getSchufaTask,
} from "@/__tests__/objectmothers/task-object-mother";
import { useContact } from "@/modules/task/composables/contact";

describe("UseContact", () => {
  describe("name", () => {
    it("should build correct name for firstname and lastname of a contact", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        contact: {
          ...getDefaultContact(),
          firstname: "Max",
          lastname: "Mustermann",
        },
      });

      // act
      const { name } = useContact(task);

      // assert
      expect(name.value).toBe("Max Mustermann");
    });
  });

  describe("emailLink", () => {
    it("should build correct email link for an email of a contact", () => {
      // arrange
      const task = ref({
        ...getSchufaTask(),
        contact: {
          ...getDefaultContact(),
          email: "max.mustermann@outlook.com",
        },
      });

      // act
      const { emailLink } = useContact(task);

      // assert
      expect(emailLink.value).toBe("mailto:max.mustermann@outlook.com");
    });
  });
});
