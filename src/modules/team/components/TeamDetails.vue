<script setup lang="ts">
import { useTeamFetch } from "@/modules/team/composables/fetch";
import { toRef } from "vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TeamDetailsView from "@/modules/team/components/TeamDetailsView.vue";
import { useRouter } from "vue-router";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import { TeamType } from "@/models/team-type";

const { t } = useBaseI18n();
const router = useRouter();
const regularTeamType = TeamType.REGULAR;

const props = defineProps<{ uuid: string; thumbnailUrl: string }>();

const {
  team,
  isLoading,
  message,
  messageType,
  deleteTeam,
  deleteQueue,
  resetStats,
} = useTeamFetch(toRef(props, "uuid"));

const onDeleteTeam = () => {
  if (confirm(t("team.delete-warning"))) {
    deleteTeam(props.uuid).then((result) => {
      if (result === undefined) {
        router.push({ name: "TeamList" });
      }
    });
  }
};
const onDeleteQueue = () => {
  if (confirm(t("team.reset-jms-queue-warning"))) {
    deleteQueue(team.value!!.jmsQueue);
  }
};
const onResetStats = () => {
  if (confirm(t("team.reset-requests-warning"))) {
    resetStats(props.uuid);
  }
};
</script>

<template>
  <template v-if="!isLoading">
    <template v-if="team">
      <TeamDetailsView :team="team" :thumbnail-url="thumbnailUrl" />

      <button
        v-if="team.type === regularTeamType"
        class="ui tiny red labeled icon button"
        @click="onDeleteTeam"
      >
        <i class="trash icon" /> {{ $t("team.delete") }}
      </button>
      <RouterLink :to="{ name: 'TeamEdit', params: { uuid, thumbnailUrl } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" /> {{ $t("team.edit") }}
        </button>
      </RouterLink>
      <button class="ui tiny orange labeled icon button" @click="onDeleteQueue">
        <i class="remove icon" /> {{ $t("team.reset-jms-queue") }}
      </button>
      <button class="ui tiny orange labeled icon button" @click="onResetStats">
        <i class="remove icon" /> {{ $t("team.reset-requests") }}
      </button>
    </template>

    <BaseMessage v-if="message" :message="message" :type="messageType" />
  </template>
  <BaseLoading v-else />
</template>
