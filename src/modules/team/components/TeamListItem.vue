<template>
  <RouterLink
    :to="{
      name: 'TeamDetails',
      params: { uuid: team.uuid, thumbnailUrl },
    }"
    class="item"
  >
    <img
      v-base-image-zoom
      v-base-image-error
      :src="thumbnailUrl"
      class="ui tiny image"
    />
    <div class="content">
      <div class="header">{{ team.username }}</div>
      <div class="description">Bankanfragen: {{ requests }}</div>
      <div class="description">{{ hasPassedStatus }}</div>
      <div class="metadata">
        <span v-for="(student, index) in team.students" :key="student.uuid">
          {{ student.firstname }} {{ student.lastname
          }}<span v-if="index !== team.students.length - 1">, </span>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import baseImageZoom from "@/modules/base/directives/base-image-zoom";
import baseImageError from "@/modules/base/directives/base-image-error";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";

export default {
  name: "TeamListItem",
  directives: {
    baseImageZoom,
    baseImageError,
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      thumbnailUrl: getRandomAvatarThumbnailUrl(),
    };
  },
  computed: {
    requests() {
      return Object.values(this.team.statistics).reduce(
        (sum, requests) => sum + requests,
        0
      );
    },
    hasPassedStatus() {
      return this.team.hasPassed ? "Bestanden" : "Nicht Bestanden";
    },
  },
};
</script>
