<script setup lang="ts">
import type { Response, Task } from "@hennihaus/bamconfigbackend";
import { useForm } from "vee-validate";
import type { Component } from "vue";
import { computed, ref } from "vue";
import TaskFormCommon from "@/modules/task/components/TaskFormCommon.vue";
import TaskFormParameters from "@/modules/task/components/TaskFormParameters.vue";
import TaskFormResponses from "@/modules/task/components/TaskFormResponses.vue";

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{ (event: "submitTask", task: Task): void }>();

const initialValues = computed(() => props.task);
const { handleSubmit, meta, isSubmitting } = useForm<Task>({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});
const onSubmit = handleSubmit((values: Task) => {
  const task: Task = {
    ...values,
    responses: values.responses.map((response: Response) => ({
      ...response,
      example: response.example.replace(/\s/g, ""),
    })),
  };
  emit("submitTask", task);
});

const currentTab = ref(0);
const tabs: Component[] = [
  TaskFormCommon,
  TaskFormParameters,
  TaskFormResponses,
];
const hasPrevTab = computed(() => currentTab.value > 0);
const hasNextTab = computed(() => currentTab.value < tabs.length - 1);
const isFirstTab = computed(() => currentTab.value === 0);
const isLastTab = computed(() => currentTab.value === tabs.length - 1);
const stepTab = computed(() => `${currentTab.value + 1}/${tabs.length}`);
const onPrev = () => currentTab.value--;
const onNext = () => currentTab.value++;
</script>

<template>
  <form class="ui equal width form" @submit="onSubmit">
    <h1>
      <span>
        <slot v-if="isFirstTab" name="task-headline" />
        <slot v-else-if="isLastTab" name="responses-headline" />
        <slot v-else name="parameters-headline" />
      </span>
      <span> ({{ $t("task.step") }} {{ stepTab }})</span>
    </h1>

    <KeepAlive>
      <component :is="tabs[currentTab]" :task="task"></component>
    </KeepAlive>

    <div class="fields">
      <div v-if="hasPrevTab" class="field">
        <button
          :disabled="!meta.valid"
          :class="[meta.valid ? 'orange' : 'red']"
          class="ui fluid button"
          type="button"
          @click="onPrev"
        >
          {{ $t("base.pagination-prev") }}
        </button>
      </div>
      <div v-if="hasNextTab" class="field">
        <button
          :disabled="!meta.valid"
          :class="[meta.valid ? 'green' : 'red']"
          class="ui fluid button"
          type="button"
          @click="onNext"
        >
          {{ $t("base.pagination-next") }}
        </button>
      </div>
      <div v-if="isLastTab" class="field">
        <button
          :disabled="!meta.valid || isSubmitting"
          :class="[meta.valid ? 'green' : 'red']"
          class="ui fluid button"
          type="submit"
        >
          {{ $t("common.save") }}
        </button>
      </div>
    </div>
  </form>
</template>
