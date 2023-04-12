import { describe, expect } from "vitest";
import { renderComponentUnderTest } from "@/__tests__/setups/setup-vue";
import BankFormCommon from "@/modules/bank/components/BankFormCommon.vue";
import { FormContextKey, useForm } from "vee-validate";
import { getAsyncBank } from "@/__tests__/objectmothers/bank-object-mother";

describe("BankFormCommon.vue", () => {
  it("should handle error validation for thumbnailUrl", async () => {
    // arrange
    const { isAsync, thumbnailUrl } = getAsyncBank();
    const { user, getByRole, getByText, queryByText } =
      renderComponentUnderTest(BankFormCommon, {
        global: {
          provide: {
            [FormContextKey as symbol]: useForm({
              initialValues: {
                isAsync,
                thumbnailUrl,
              },
            }),
          },
        },
      });

    // act -> user clears field
    // assert -> a required message should be shown
    await user.clear(getByRole("textbox", { name: "Image-URL" }));
    expect(getByText(/.*image-url field.*/i).textContent).toContain("required");

    // act -> user types correct url
    // assert -> the message should disappear
    await user.type(getByRole("textbox", { name: "Image-URL" }), thumbnailUrl);
    expect(queryByText(/.*image-url field.*/i)).toBeFalsy();

    // act -> user clears and writes invalid URL
    // assert -> an invalid url message should be shown
    await user.clear(getByRole("textbox", { name: "Image-URL" }));
    await user.type(getByRole("textbox", { name: "Image-URL" }), "invalidUrl");
    expect(getByText(/.*image-url field.*/i).textContent).toContain(
      "not a valid URL"
    );

    // act -> user types correct url
    // assert -> the message should disappear
    await user.clear(getByRole("textbox", { name: "Image-URL" }));
    await user.type(getByRole("textbox", { name: "Image-URL" }), thumbnailUrl);
    expect(queryByText(/.*image-url field.*/i)).toBeFalsy();
  });
});
