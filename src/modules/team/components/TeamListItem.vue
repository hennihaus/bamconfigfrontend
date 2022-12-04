<template>
  <RouterLink
    :to="{
      name: 'TeamDetails',
      params: { uuid: team.uuid, thumbnailUrl },
    }"
    class="item"
  >
    <img v-base-image-error :src="thumbnailUrl" class="ui tiny image" />
    <div class="content">
      <div class="header">{{ team.username }}</div>
      <div class="description">{{ $t("team.type") }}: {{ type }}</div>
      <div class="description">
        {{ $tc("team.request", 2) }}: {{ requests }}
      </div>
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
import baseImageError from "@/modules/base/directives/base-image-error";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";

export default {
  name: "TeamListItem",
  directives: {
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
    type() {
      let type = "";

      switch (this.team.type) {
        case "EXAMPLE":
          type = "Beispiel";
          break;
        case "REGULAR":
          type = "Regulär";
          break;
        default:
          type = "Unbekannt";
      }

      return type;
    },
    requests() {
      return Object.values(this.team.statistics).reduce(
        (sum, requests) => sum + requests,
        0
      );
    },
    hasPassedStatus() {
      return this.team.hasPassed
        ? this.$tc("team.passed", 1)
        : this.$tc("team.passed", 0);
    },
  },
};
</script>
