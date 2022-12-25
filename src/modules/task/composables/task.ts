import type { Ref } from "vue";
import { computed } from "vue";
import type { Task } from "@hennihaus/bamconfigbackend";
import i18n from "@/plugins/i18n";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import { IntegrationStep } from "@/models/integration-step";

export const useTask = (task: Ref<Task>) => {
  const { t } = useBaseI18n();

  const integrationStepNumber = computed(() => {
    if (i18n.global.locale.value === "de") {
      return ".";
    }
    if (task.value.integrationStep === IntegrationStep.FIRST) {
      return "st";
    }
    if (task.value.integrationStep === IntegrationStep.SECOND) {
      return "nd";
    }
    if (task.value.integrationStep === IntegrationStep.THIRD) {
      return "rd";
    }
    return "th";
  });
  const integrationStep = computed(
    () => `${task.value.integrationStep}${integrationStepNumber.value}`
  );

  const thumbnailUrl = computed(() => task.value.banks[0].thumbnailUrl);

  const description = computed(() =>
    task.value.description && task.value.description.length
      ? task.value.description
      : `${t("task.description")} ${t("common.available", 0)}`
  );

  const isAsyncTask = computed(() => {
    return (
      task.value.banks && task.value.banks.length && task.value.banks[0].isAsync
    );
  });

  const hasNoAsyncBanksActivated = computed(() => {
    if (!task.value.banks.some((bank) => bank.isAsync)) {
      return false;
    }
    return !task.value.banks
      .filter((bank) => bank.isAsync)
      .some((bank) => bank.isActive);
  });

  return {
    integrationStep,
    thumbnailUrl,
    description,
    isAsyncTask,
    hasNoAsyncBanksActivated,
  };
};
