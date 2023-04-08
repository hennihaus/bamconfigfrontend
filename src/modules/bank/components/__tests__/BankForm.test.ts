import { describe, expect, it } from "vitest";
import { renderComponentUnderTest } from "@/__tests__/setups/setup-vue";
import BankForm from "@/modules/bank/components/BankForm.vue";
import {
  getAsyncBank,
  getCreditConfigurationWithNoEmptyFields,
  getSchufaBank,
} from "@/__tests__/objectmothers/bank-object-mother";
import { RatingLevel } from "@/models/rating-level";
import type { RenderOptions } from "@testing-library/vue";

describe("BankForm.vue", () => {
  const renderBankForm = (options?: RenderOptions) => {
    const componentUnderTest = renderComponentUnderTest(BankForm, {
      ...options,
    });
    const getIsActiveSelect = () =>
      componentUnderTest.queryByRole("combobox", {
        name: "Status",
      });
    const getThumbnailUrlInput = () =>
      componentUnderTest.queryByRole("textbox", {
        name: "Image-URL",
      });
    const getMinAmountInEurosInput = () =>
      componentUnderTest.queryByRole("spinbutton", {
        name: /credit minimum*./i,
      });
    const getMaxAmountInEurosInput = () =>
      componentUnderTest.queryByRole("spinbutton", {
        name: /credit limit*./i,
      });
    const getMinTermInMonthsInput = () =>
      componentUnderTest.queryByRole("spinbutton", {
        name: /minimum runtime*./i,
      });
    const getMaxTermInMonthsInput = () =>
      componentUnderTest.queryByRole("spinbutton", {
        name: /maximum runtime*./i,
      });
    const getMinSchufaRatingSelect = () =>
      componentUnderTest.queryByRole("combobox", {
        name: "Min. Schufa Rating",
      });
    const getMaxSchufaRatingSelect = () =>
      componentUnderTest.queryByRole("combobox", {
        name: "Max. Schufa Rating",
      });
    const getThumbnailUrlError = () =>
      componentUnderTest.getByText(/.*image-url field.*/i);
    const getMinAmountInEurosError = () =>
      componentUnderTest.getByText(/.*credit minimum field.*/i);
    const getMaxAmountInEurosError = () =>
      componentUnderTest.getByText(/.*credit limit field.*/i);
    const getMinTermInMonthsError = () =>
      componentUnderTest.getByText(/.*minimum runtime field.*/i);
    const getMaxTermInMonthsError = () =>
      componentUnderTest.getByText(/.*maximum runtime field.*/i);

    return {
      ...componentUnderTest,
      getIsActiveSelect,
      getThumbnailUrlInput,
      getThumbnailUrlError,
      getMinAmountInEurosInput,
      getMinAmountInEurosError,
      getMaxAmountInEurosInput,
      getMaxAmountInEurosError,
      getMinTermInMonthsInput,
      getMinTermInMonthsError,
      getMaxTermInMonthsInput,
      getMaxTermInMonthsError,
      getMinSchufaRatingSelect,
      getMaxSchufaRatingSelect,
    };
  };

  it("should show max fields for an async bank with credit configuration", () => {
    // arrange
    const bankForm = renderBankForm({
      props: {
        bank: getAsyncBank(),
        isAsync: true,
        creditConfiguration: getCreditConfigurationWithNoEmptyFields(),
      },
    });

    // assert
    expect(bankForm.getIsActiveSelect()).toBeTruthy();
    expect(bankForm.getThumbnailUrlInput()).toBeTruthy();
    expect(bankForm.getMinAmountInEurosInput()).toBeTruthy();
    expect(bankForm.getMaxAmountInEurosInput()).toBeTruthy();
    expect(bankForm.getMinTermInMonthsInput()).toBeTruthy();
    expect(bankForm.getMaxTermInMonthsInput()).toBeTruthy();
    expect(bankForm.getMinSchufaRatingSelect()).toBeTruthy();
    expect(bankForm.getMaxSchufaRatingSelect()).toBeTruthy();
  });

  it("should show min fields for a sync bank without credit configuration", () => {
    // arrange
    const bankForm = renderBankForm({
      props: {
        bank: {
          ...getSchufaBank(),
          isAsync: false,
          creditConfiguration: null,
        },
      },
    });

    // assert
    expect(bankForm.getIsActiveSelect()).toBeFalsy();
    expect(bankForm.getThumbnailUrlInput()).toBeTruthy();
    expect(bankForm.getMinAmountInEurosInput()).toBeFalsy();
    expect(bankForm.getMaxAmountInEurosInput()).toBeFalsy();
    expect(bankForm.getMinTermInMonthsInput()).toBeFalsy();
    expect(bankForm.getMaxTermInMonthsInput()).toBeFalsy();
    expect(bankForm.getMinSchufaRatingSelect()).toBeFalsy();
    expect(bankForm.getMaxSchufaRatingSelect()).toBeFalsy();
  });

  it("should submit a correctly prefilled bank form with max fields", async () => {
    // arrange
    const { user, getByRole, emitted } = renderBankForm({
      props: {
        bank: getAsyncBank(),
        isAsync: true,
        creditConfiguration: getCreditConfigurationWithNoEmptyFields(),
      },
    });

    // act
    await user.click(getByRole("button", { name: "Save" }));

    // assert
    expect(emitted("submitBank")).toHaveLength(1);
    expect(emitted("submitBank")[0]).toEqual([getAsyncBank()]);
  });

  it("should submit a correctly prefilled bank form with min fields", async () => {
    // arrange
    const { user, getByRole, emitted } = renderBankForm({
      props: {
        bank: getSchufaBank(),
        isAsync: false,
        creditConfiguration: null,
      },
    });

    // act
    await user.click(getByRole("button", { name: "Save" }));

    // assert
    expect(emitted("submitBank")).toHaveLength(1);
    expect(emitted("submitBank")[0]).toEqual([getSchufaBank()]);
  });

  it("should not submit an invalid prefilled bank form", async () => {
    // arrange
    const { user, getByRole, emitted, ...componentUnderTest } = renderBankForm({
      props: {
        bank: {
          ...getAsyncBank(),
          thumbnailUrl: "",
        },
      },
    });

    // act
    await user.click(getByRole("button", { name: "Save" }));

    // assert
    expect(componentUnderTest.getThumbnailUrlError()).toBeTruthy();
    expect(emitted()).not.toHaveProperty("submitBank");
  });

  it("should submit a correctly changed bank form", async () => {
    // arrange
    const { user, emitted, getByRole, ...componentUnderTest } = renderBankForm({
      props: {
        bank: {
          ...getAsyncBank(),
        },
      },
    });

    // act
    await user.selectOptions(componentUnderTest.getIsActiveSelect()!!, [
      "false",
    ]);
    await user.clear(componentUnderTest.getThumbnailUrlInput()!!);
    await user.type(
      componentUnderTest.getThumbnailUrlInput()!!,
      "https://bit.ly"
    );
    await user.clear(componentUnderTest.getMinAmountInEurosInput()!!);
    await user.type(componentUnderTest.getMinAmountInEurosInput()!!, "1");
    await user.clear(componentUnderTest.getMaxAmountInEurosInput()!!);
    await user.type(componentUnderTest.getMaxAmountInEurosInput()!!, "2");
    await user.clear(componentUnderTest.getMinTermInMonthsInput()!!);
    await user.type(componentUnderTest.getMinTermInMonthsInput()!!, "1");
    await user.clear(componentUnderTest.getMaxTermInMonthsInput()!!);
    await user.type(componentUnderTest.getMaxTermInMonthsInput()!!, "2");
    await user.selectOptions(componentUnderTest.getMinSchufaRatingSelect()!!, [
      RatingLevel.B,
    ]);
    await user.selectOptions(componentUnderTest.getMaxSchufaRatingSelect()!!, [
      RatingLevel.O,
    ]);
    await user.click(getByRole("button", { name: "Save" }));

    // assert
    expect(emitted("submitBank")).toHaveLength(1);
    expect(emitted("submitBank")[0]).toStrictEqual([
      {
        ...getAsyncBank(),
        isActive: false,
        thumbnailUrl: "https://bit.ly",
        creditConfiguration: {
          minAmountInEuros: 1,
          maxAmountInEuros: 2,
          minTermInMonths: 1,
          maxTermInMonths: 2,
          minSchufaRating: RatingLevel.B,
          maxSchufaRating: RatingLevel.O,
        },
      },
    ]);
  });

  it("should show error messages when all required fields are empty", async () => {
    // arrange
    const { user, ...componentUnderTest } = renderBankForm({
      props: {
        bank: getAsyncBank(),
      },
    });

    // act
    await user.clear(componentUnderTest.getThumbnailUrlInput()!!);
    await user.clear(componentUnderTest.getMinAmountInEurosInput()!!);
    await user.clear(componentUnderTest.getMaxAmountInEurosInput()!!);
    await user.clear(componentUnderTest.getMinTermInMonthsInput()!!);
    await user.clear(componentUnderTest.getMaxTermInMonthsInput()!!);

    // assert
    expect(componentUnderTest.getThumbnailUrlError().textContent).toContain(
      "required"
    );
    expect(componentUnderTest.getMinAmountInEurosError().textContent).toContain(
      "required"
    );
    expect(componentUnderTest.getMaxAmountInEurosError().textContent).toContain(
      "required"
    );
    expect(componentUnderTest.getMinTermInMonthsError().textContent).toContain(
      "required"
    );
    expect(componentUnderTest.getMaxTermInMonthsError().textContent).toContain(
      "required"
    );
  });
});
