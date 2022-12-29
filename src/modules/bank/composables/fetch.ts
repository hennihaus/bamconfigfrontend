import type { Ref } from "vue";
import {
  computed,
  inject,
  onBeforeMount,
  onUnmounted,
  readonly,
  ref,
  watchEffect,
} from "vue";
import type { Bank } from "@hennihaus/bamconfigbackend";
import { BANK_API, STATISTIC_API } from "@/plugins/http";
import type { BankApiService } from "@/services/bank-api-service";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import type { StatisticApiService } from "@/services/statistic-api-service";
import { MessageType } from "@/models/message-type";

export const useBanksFetch = () => {
  const bankApi = inject(BANK_API) as BankApiService;

  const banks = ref<Bank[]>([]);
  const isLoading = ref(true);

  onBeforeMount(() =>
    bankApi
      .getAll()
      .then((result) => (banks.value = result))
      .catch(() => (banks.value = []))
      .finally(() => (isLoading.value = false))
  );

  const asyncBanks = computed(() => banks.value.filter((bank) => bank.isAsync));

  return {
    banks,
    asyncBanks,
    isLoading: readonly(isLoading),
  };
};

export const useBankFetch = (uuid: Ref<string>) => {
  const { t } = useBaseI18n();
  const bankApi = inject(BANK_API) as BankApiService;
  const statisticApi = inject(STATISTIC_API) as StatisticApiService;

  const bank = ref<Bank>();
  const isLoading = ref(false);
  const message = ref("");
  const messageType = ref(MessageType.POSITIVE);

  const unwatch = watchEffect(async () => {
    try {
      isLoading.value = true;
      bank.value = await bankApi.getOne(uuid.value);
      message.value = "";
      messageType.value = MessageType.POSITIVE;
    } catch (e) {
      message.value = t("bank.not-found", 1);
      messageType.value = MessageType.NEGATIVE;
    } finally {
      isLoading.value = false;
    }
  });
  onUnmounted(() => unwatch());

  const updateBank = async (update: Bank): Promise<Bank | null> => {
    try {
      isLoading.value = true;
      bank.value = await bankApi.update(update);
      message.value = "";
      messageType.value = MessageType.POSITIVE;
      return bank.value;
    } catch (e) {
      message.value = t("bank.edit-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const saveStatistics = async (bankId: string): Promise<void | null> => {
    try {
      isLoading.value = true;
      await statisticApi.saveAll(bankId);
      message.value = t("bank.add-teams-success");
      messageType.value = MessageType.POSITIVE;
      return;
    } catch (e) {
      message.value = t("bank.add-teams-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteStatistics = async (bankId: string): Promise<void | null> => {
    try {
      isLoading.value = true;
      await statisticApi.deleteAll(bankId);
      message.value = t("bank.remove-teams-success");
      messageType.value = MessageType.POSITIVE;
      return;
    } catch (e) {
      message.value = t("bank.remove-teams-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    bank,
    isLoading: readonly(isLoading),
    message: readonly(message),
    messageType: readonly(messageType),
    updateBank,
    saveStatistics,
    deleteStatistics,
  };
};
