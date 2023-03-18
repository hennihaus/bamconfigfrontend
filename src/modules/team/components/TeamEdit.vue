<script setup lang="ts">
import { useBanksFetch } from "@/modules/bank/composables/fetch";
import { useTeamFetch } from "@/modules/team/composables/fetch";
import { computed, provide, toRef } from "vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import TeamForm from "@/modules/team/components/TeamForm.vue";
import type { Team } from "@hennihaus/bamconfigbackend";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";
import { useRouter } from "vue-router";
import { BANKS, TEAM } from "@/models/symbols";

const router = useRouter();

const props = defineProps<{ uuid: string; thumbnailUrl: string }>();

const { banks, isLoading: isLoadingBanks } = useBanksFetch();
provide(BANKS, banks);

const {
  team,
  isLoading: isLoadingTeam,
  message,
  updateTeam,
} = useTeamFetch(toRef(props, "uuid"));
provide(TEAM, team);

const isLoading = computed(() => isLoadingBanks.value || isLoadingTeam.value);

const onSubmitTeam = (team: Team) => {
  updateTeam(team).then((team) => {
    if (team) {
      router.push({
        name: "TeamDetails",
        params: {
          uuid: team.uuid,
          thumbnailUrl: getRandomAvatarThumbnailUrl(),
        },
      });
    }
  });
};
</script>

<template>
  <template v-if="!isLoading">
    <h1>{{ $t("team.edit") }}</h1>
    <BaseMessage v-if="message" :message="message" />
    <TeamForm :team="team" @submit-team="onSubmitTeam" />
  </template>
  <BaseLoading v-else />
</template>
