import { afterEach, beforeEach } from "vitest";
import type { RenderOptions } from "@testing-library/vue";
import { cleanup, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import veeValidate from "@/plugins/vee-validate";
import i18n from "@/plugins/i18n";

beforeEach(() => {
  i18n.global.locale.value = "en";
});
afterEach(() => {
  cleanup();
});

export const renderComponentUnderTest = (
  componentUnderTest: JSX.Element,
  options?: RenderOptions
) => ({
  user: userEvent.setup(),
  ...render(componentUnderTest, {
    ...options,
    global: {
      plugins: [veeValidate, i18n],
    },
  }),
});
