<script setup lang="ts">
import { useBanksFetch } from "@/modules/bank/composables/fetch";
import TeamForm from "@/modules/team/components/TeamForm.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import { computed, provide, ref } from "vue";
import { BANKS } from "@/models/symbols";
import type { Team } from "@hennihaus/bamconfigbackend";
import { useTeamFetch } from "@/modules/team/composables/fetch";
import { useRouter } from "vue-router";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

const router = useRouter();

const { banks, isLoading: isLoadingBanks } = useBanksFetch();
provide(BANKS, banks);

const {
  updateTeam,
  isLoading: isLoadingTeam,
  message,
} = useTeamFetch(ref(""), false);
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

const isLoading = computed(() => isLoadingBanks.value || isLoadingTeam.value);
</script>

<template>
  <template v-if="!isLoadingBanks">
    <h1>{{ $t("team.create") }}</h1>
    <BaseMessage v-if="message" :message="message" />
    <TeamForm @submit-team="onSubmitTeam" />
  </template>
  <BaseLoading v-if="isLoading" />
</template>
