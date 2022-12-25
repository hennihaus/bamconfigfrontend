import type { Ref } from "vue";
import { inject, onUnmounted, readonly, ref, watch } from "vue";
import { BROKER_API, TEAM_API } from "@/plugins/http";
import type { TeamApiService } from "@/services/team-api-service";
import type { Pagination, Team } from "@hennihaus/bamconfigbackend";
import { useRoute } from "vue-router";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import { MessageType } from "@/models/message-type";
import type { BrokerApiService } from "@/services/broker-api-service";

const ITEMS_PER_PAGE = 8;

export const useTeamsFetch = (itemsPerPage: number = ITEMS_PER_PAGE) => {
  const teamApi = inject(TEAM_API) as TeamApiService;
  const route = useRoute();

  const teams = ref<Team[]>([]);
  const pagination = ref<Pagination>({ first: "", last: "" });
  const isLoading = ref(true);

  const unwatch = watch(
    () => route.query,
    async (newQuery, oldQuery) => {
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        try {
          isLoading.value = true;
          let params: any = route.query.cursor
            ? { cursor: route.query.cursor }
            : { ...route.query, limit: itemsPerPage };

          if (params.hasPassed) {
            params = {
              ...params,
              hasPassed: params.hasPassed === "PASSED",
            };
          }
          const response = await teamApi.getAll(params);
          teams.value = response.items;
          pagination.value = response.pagination;
        } catch (e) {
          teams.value = [];
        } finally {
          isLoading.value = false;
        }
      }
    },
    { immediate: true }
  );
  onUnmounted(() => unwatch());

  return {
    teams,
    pagination: readonly(pagination),
    isLoading: readonly(isLoading),
  };
};

export const useTeamFetch = (uuid: Ref<string>, immediate: boolean = true) => {
  const { t } = useBaseI18n();
  const teamApi = inject(TEAM_API) as TeamApiService;
  const brokerApi = inject(BROKER_API) as BrokerApiService;

  const team = ref<Team>();
  const isLoading = ref(false);
  const message = ref("");
  const messageType = ref(MessageType.POSITIVE);

  const unwatch = watch(
    uuid,
    async (uuid: string) => {
      try {
        isLoading.value = true;
        team.value = await teamApi.getOne(uuid);
        message.value = "";
        messageType.value = MessageType.POSITIVE;
      } catch (e) {
        message.value = t("team.not-found", 1);
        messageType.value = MessageType.NEGATIVE;
      } finally {
        isLoading.value = false;
      }
    },
    { immediate }
  );
  onUnmounted(() => unwatch());

  const updateTeam = async (update: Team): Promise<Team | null> => {
    try {
      isLoading.value = true;
      team.value = await teamApi.update(update);
      message.value = "";
      messageType.value = MessageType.POSITIVE;
      return team.value;
    } catch (e) {
      message.value = t("team.create-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTeam = async (uuid: string): Promise<void | null> => {
    try {
      isLoading.value = true;
      await teamApi.delete(uuid);
      message.value = "";
      messageType.value = MessageType.POSITIVE;
      return;
    } catch (e) {
      message.value = t("team.delete-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteQueue = async (jmsQueue: string): Promise<void | null> => {
    try {
      isLoading.value = true;
      await brokerApi.deleteQueueByName(jmsQueue);
      message.value = t("team.reset-jms-queue-success", {
        jmsQueue: team.value!!.jmsQueue,
      });
      messageType.value = MessageType.POSITIVE;
      return;
    } catch (e) {
      message.value = t("team.reset-jms-queue-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const resetStats = async (uuid: string): Promise<Team | null> => {
    try {
      isLoading.value = true;
      team.value = await teamApi.resetStatistics(uuid);
      message.value = "";
      messageType.value = MessageType.POSITIVE;
      return team.value;
    } catch (e) {
      message.value = t("team.reset-requests-error");
      messageType.value = MessageType.NEGATIVE;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    team,
    isLoading: readonly(isLoading),
    message: readonly(message),
    messageType: readonly(messageType),
    updateTeam,
    deleteTeam,
    deleteQueue,
    resetStats,
  };
};
