import { inject, readonly, ref } from "vue";
import { MessageType } from "@/models/message-type";
import { BROKER_API, STATISTIC_API } from "@/plugins/http";
import type { BrokerApiService } from "@/services/broker-api-service";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import type { StatisticApiService } from "@/services/statistic-api-service";

export const useBrokerFetch = () => {
  const { t } = useBaseI18n();
  const brokerApi = inject(BROKER_API) as BrokerApiService;

  const isLoading = ref(false);
  const message = ref("");
  const messageType = ref(MessageType.POSITIVE);

  const resetBroker = async (): Promise<void | null> => {
    try {
      isLoading.value = true;
      await brokerApi.resetBroker();
      message.value = t("core.home-restart-course-success");
      messageType.value = MessageType.POSITIVE;
      return;
    } catch (e) {
      message.value = t("core.home-restart-course-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    message: readonly(message),
    messageType: readonly(messageType),
    resetBroker,
  };
};

export const useStatisticsFetch = () => {
  const statisticApi = inject(STATISTIC_API) as StatisticApiService;

  const isLoading = ref(false);

  const recreateStatistics = async (limit: number): Promise<void | null> => {
    try {
      isLoading.value = true;
      await statisticApi.recreateAll(limit);
      return;
    } catch (e) {
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    recreateStatistics,
  };
};
