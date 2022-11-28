<template>
  <h1>{{ team.username }}</h1>
  <div class="ui divider" />

  <div class="ui grid">
    <div class="four wide column">
      <img v-base-image-error :src="thumbnailUrl" class="ui small image" />
    </div>

    <div class="four wide column">
      <h4>Benutzername</h4>
      <div>{{ team.username }}</div>
      <h4>Passwort</h4>
      <div>{{ team.password }}</div>
    </div>

    <div class="four wide column">
      <h4>JMS-Queue</h4>
      <div>{{ team.jmsQueue }}</div>
      <h4>Aktueller Status</h4>
      <div>{{ hasPassedStatus }}</div>
    </div>

    <div class="four wide column">
      <h4>Studenten</h4>
      <div v-for="student in team.students" :key="student.uuid">
        {{ student.firstname }} {{ student.lastname }}
      </div>
      <div v-if="hasNoStudents">Keine Studenten vorhanden</div>
    </div>
  </div>

  <h4>Banken</h4>
  <div>TODO</div>
  <div class="ui divider" />
</template>

<script>
import baseImageError from "@/modules/base/directives/base-image-error";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";

export default {
  name: "TeamDetailsView",
  directives: {
    baseImageError,
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: false,
      default: () => getRandomAvatarThumbnailUrl(),
    },
  },
  computed: {
    hasNoStudents() {
      return !this.team.students.length;
    },
    hasPassedStatus() {
      return this.team.hasPassed ? "Bestanden" : "Nicht Bestanden";
    },
  },
};
</script>
