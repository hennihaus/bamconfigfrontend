<template>
  <h1>Teameinteilung</h1>
  <div class="divider" />

  <table class="ui celled table">
    <thead>
      <tr>
        <th>Team</th>
        <th>Student</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="team in teams" :key="team.uuid">
        <tr v-for="student in team.students" :key="student.uuid">
          <td>{{ team.username }}</td>
          <td>{{ student.firstname }} {{ student.lastname }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TeamDivision",
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
};
</script>
