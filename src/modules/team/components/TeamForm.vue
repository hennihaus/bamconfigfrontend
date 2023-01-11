<script setup lang="ts">
import type { Team } from "@hennihaus/bamconfigbackend";
import { useForm } from "vee-validate";
import { computed, inject, ref } from "vue";
import {
  createEmptyStudent,
  createEmptyTeam,
} from "@/modules/team/services/team-service";
import TeamFormStudents from "@/modules/team/components/TeamFormStudents.vue";
import { TEAM } from "@/models/symbols";
import TeamFormStatistics from "@/modules/team/components/TeamFormStatistics.vue";
import {
  mergeStatistics,
  removeStatistics,
} from "@/modules/team/services/statistic-service";
import TeamFormCommon from "@/modules/team/components/TeamFormCommon.vue";

const emit = defineEmits<{ (event: "submitTeam", team: Team): void }>();

const oldTeam = inject(TEAM, () => ref<Team | undefined>(undefined), true);

const initialValues = computed(() => {
  if (oldTeam.value) {
    return {
      ...oldTeam.value,
      students: oldTeam.value.students.length
        ? oldTeam.value.students
        : [createEmptyStudent()],
      statistics: removeStatistics(oldTeam.value),
    };
  }
  return createEmptyTeam();
});
const { handleSubmit, validateField } = useForm<Team>({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});

const onSubmit = handleSubmit((newTeam: Team) => {
  const statistics = mergeStatistics(newTeam, oldTeam.value);
  const students = newTeam.students.filter(
    (student) => student.firstname && student.lastname
  );
  const createdAt = newTeam.createdAt
    ? newTeam.createdAt
    : createLocalDateTime();
  const updatedAt = createLocalDateTime();

  emit("submitTeam", {
    ...newTeam,
    students,
    statistics,
    createdAt,
    updatedAt,
  });
});

const createLocalDateTime = (): string => {
  const date = new Date();
  date.setMilliseconds(0);
  return date.toISOString().split(".000Z")[0];
};
</script>

<template>
  <form class="ui form" @submit="onSubmit">
    <TeamFormCommon />
    <TeamFormStudents :validate-field="validateField" />
    <TeamFormStatistics />
  </form>
</template>
