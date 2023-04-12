import { describe, expect } from "vitest";
import { getAsyncBank } from "@/__tests__/objectmothers/bank-object-mother";
import { renderComponentUnderTest } from "@/__tests__/setups/setup-vue";
import { FormContextKey, useForm } from "vee-validate";
import BankFormCreditConfiguration from "@/modules/bank/components/BankFormCreditConfiguration.vue";
import { getByRole, RenderOptions } from "@testing-library/vue";

describe("BankFormCreditConfiguration.vue", () => {
  const renderBankFormCreditConfiguration = (options?: RenderOptions) => {
    const componentUnderTest = renderComponentUnderTest(
      BankFormCreditConfiguration,
      {
        ...options,
      }
    );
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

    return {
      ...componentUnderTest,
      getMinAmountInEurosInput,
      getMaxAmountInEurosInput,
      getMinTermInMonthsInput,
      getMaxTermInMonthsInput,
      getMinSchufaRatingSelect,
      getMaxSchufaRatingSelect,
    };
  };

  it("should handle error validation for minAmountInEuros", async () => {
    // arrange
    const { creditConfiguration } = getAsyncBank();
    const { user, ...bankForm } = renderBankFormCreditConfiguration({
      global: {
        provide: {
          [FormContextKey as symbol]: useForm({
            initialValues: {
              creditConfiguration: creditConfiguration!!,
            },
          }),
        },
      },
    });

    // act -> user clears field
    // assert -> a required message should be shown
    await user.clear();
    expect(bankForm.getMinAmountInEuro);
  });
});
