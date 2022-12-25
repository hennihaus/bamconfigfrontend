<script setup lang="ts">
import type { ValidationResult } from "vee-validate";
import { Field, useFieldArray } from "vee-validate";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";
import { createEmptyStudent } from "@/modules/team/services/team-service";
import type { Student, Team } from "@hennihaus/bamconfigbackend";

const FIRST_STUDENT_ITEM = 0;
const ONE_STUDENT = 1;

const props = defineProps<{
  validateField: (field: keyof Team) => Promise<ValidationResult>;
}>();

const {
  fields: students,
  push,
  remove,
  replace,
} = useFieldArray<Student>("students");

const studentRules = {
  min_optional: 2,
  max_optional: 50,
};

const onFirstnameBlur = (index: number) => {
  props.validateField(`students[${index}].lastname` as keyof Team);
};
const onLastnameBlur = (index: number) => {
  props.validateField(`students[${index}].firstname` as keyof Team);
};

const onCreateStudent = () => push(createEmptyStudent());
const onRemoveStudent = (index: number) => {
  if (index === FIRST_STUDENT_ITEM && students.value.length === ONE_STUDENT) {
    replace([createEmptyStudent()]);
  } else {
    remove(index);
  }
};
</script>

<template>
  <div class="field">
    <label>{{ $t("team.student", 2) }}</label>
    <div v-for="(entry, idx) in students" :key="entry.key" class="two fields">
      <Field
        v-slot="{ field, errors }"
        :label="$t('common.firstname')"
        :name="`students[${idx}].firstname`"
        :rules="{
          ...studentRules,
          required_name: [`@students[${idx}].lastname`],
        }"
        as="div"
        class="field"
      >
        <input
          v-bind="field"
          :placeholder="$t('common.firstname')"
          type="text"
          @blur="onFirstnameBlur(idx)"
        />
        <BaseFormMessage :errors="errors" />
      </Field>

      <Field
        v-slot="{ field, errors }"
        :label="$t('common.lastname')"
        :name="`students[${idx}].lastname`"
        :rules="{
          ...studentRules,
          required_name: [`@students[${idx}].firstname`],
        }"
        as="div"
        class="field"
      >
        <div class="ui action input">
          <input
            v-bind="field"
            :placeholder="$t('common.lastname')"
            type="text"
            @blur="onLastnameBlur(idx)"
          />
          <button
            type="button"
            class="ui green icon button"
            @click="onCreateStudent"
          >
            <i class="add icon" />
          </button>
          <button
            type="button"
            class="ui red icon button"
            @click="onRemoveStudent(idx)"
          >
            <i class="trash icon" />
          </button>
        </div>
        <BaseFormMessage :errors="errors" />
      </Field>
    </div>
  </div>
</template>
