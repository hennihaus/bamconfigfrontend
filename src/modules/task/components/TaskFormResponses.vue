<script setup lang="ts">
import { Field, useFieldArray } from "vee-validate";
import type { Response } from "@hennihaus/bamconfigbackend";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";

const NO_STATUS_CODE_POSSIBLE = -1;

const { fields: responses } = useFieldArray<Response>("responses");
const descriptionRules = {
  required: true,
  min: 1,
  max: 100,
};
const exampleRules = {
  required: true,
  json: true,
  not_empty_json: true,
};
</script>

<template>
  <div
    v-for="(response, index) in responses"
    :key="response.key"
    class="fields"
  >
    <div class="field">
      <label>
        <span>{{ $t("task.response-description") }}</span>
        <span v-if="response.value.httpStatusCode !== NO_STATUS_CODE_POSSIBLE">
          ({{ $t("task.response-http-status-code") }}
          {{ response.value.httpStatusCode }})
        </span>
      </label>
      <Field
        v-slot="{ field, errors }"
        :name="`responses[${index}].description`"
        :rules="descriptionRules"
        :label="$t('task.response-description')"
        type="text"
      >
        <div class="ui left corner labeled input">
          <input v-bind="field" type="text" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <BaseFormMessage :errors="errors" />
      </Field>
    </div>

    <div class="field">
      <label>{{ $t("task.response-example") }}</label>
      <Field
        v-slot="{ field, errors }"
        :name="`responses[${index}].example`"
        :rules="exampleRules"
        :label="$t('task.response-example')"
        type="text"
      >
        <div class="ui left corner labeled input">
          <input v-bind="field" type="text" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <BaseFormMessage :errors="errors" />
      </Field>
    </div>
  </div>
</template>
