<script setup lang="ts">
import BaseCursorPagination from "@/modules/base/components/BaseCursorPagination.vue";
import { useTeamsFetch } from "@/modules/team/composables/fetch";
import { useBanksFetch } from "@/modules/bank/composables/fetch";
import TeamListItem from "@/modules/team/components/TeamListItem.vue";
import TeamListFilter from "@/modules/team/components/TeamListFilter.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import { computed } from "vue";

const { teams, pagination, isLoading: isLoadingTeams } = useTeamsFetch();
const { banks, isLoading: isLoadingBanks } = useBanksFetch();
const isLoading = computed(() => isLoadingTeams.value || isLoadingBanks.value);
</script>

<template>
  <BaseCursorPagination :pagination="pagination" component="TeamList">
    <template #items>
      <TeamListItem v-for="team in teams" :key="team.uuid" :team="team" />

      <BaseMessage
        v-if="!isLoading && !teams.length"
        :message="$t('team.not-found', 2)"
      />
    </template>

    <template #filters>
      <div class="filter">
        <TeamListFilter :banks="banks" />
      </div>
    </template>
  </BaseCursorPagination>
  <BaseLoading v-if="isLoading" />
</template>

<style scoped>
.filter {
  width: 256.25px;
}
</style>
