<script setup lang="ts">
import type { Team } from "@hennihaus/bamconfigbackend";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";
import { useTeam } from "@/modules/team/composables/team";
import { toRef } from "vue";

const props = withDefaults(
  defineProps<{
    team: Team;
    thumbnailUrl?: string;
  }>(),
  { thumbnailUrl: () => getRandomAvatarThumbnailUrl() }
);

const { hasPassedStatus } = useTeam(toRef(props, "team"));
</script>

<template>
  <h1>{{ team.username }}</h1>
  <div class="ui divider" />

  <div class="ui grid">
    <div v-if="thumbnailUrl" class="four wide column">
      <img v-base-image-error :src="thumbnailUrl" class="ui small image" />
    </div>

    <div class="four wide column">
      <h4>{{ $t("team.username") }}</h4>
      <div>{{ team.username }}</div>
      <h4>{{ $t("team.password") }}</h4>
      <div>{{ team.password }}</div>
    </div>

    <div class="four wide column">
      <h4>{{ $t("team.jms-queue") }}</h4>
      <div>{{ team.jmsQueue }}</div>
      <h4>{{ $t("common.status") }}</h4>
      <div>{{ hasPassedStatus }}</div>
    </div>

    <div class="four wide column">
      <h4>{{ $t("team.student", 2) }}</h4>
      <div v-for="student in team.students" :key="student.uuid">
        {{ student.firstname }} {{ student.lastname }}
      </div>
      <div v-if="!team.students.length">
        {{ $t("team.student", 0) }} {{ $t("common.available", 1) }}
      </div>
    </div>
  </div>

  <h4>{{ $t("core.bank", 2) }}</h4>
  <div>TODO</div>
  <span v-for="(requests, bank) in team.statistics" :key="bank">
    {{ bank }}: {{ requests }}&nbsp;
  </span>

  <div class="ui divider" />
</template>
