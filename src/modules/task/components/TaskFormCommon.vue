<script setup lang="ts">
import { useField } from "vee-validate";
import { inject, onUnmounted, reactive, watch } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";
import { TASK_API } from "@/plugins/http";
import type { TaskApiService } from "@/services/task-api-service";
import type { Task } from "@hennihaus/bamconfigbackend";
import { useBaseI18n } from "@/modules/base/composables/i18n";

const { t, locale } = useBaseI18n();

const props = defineProps<{ task: Task }>();

const {
  value: title,
  errors: titleErrors,
  handleBlur: handleTitleBlur,
} = useField<string>(
  "title",
  {
    required: true,
    min: 6,
    max: 50,
    unique_title: {
      uuid: props.task.uuid,
      taskApi: inject(TASK_API) as TaskApiService,
    },
  },
  { label: t("task.title") }
);
const {
  value: firstname,
  errors: firstnameErrors,
  handleBlur: handleFirstnameBlur,
} = useField<string>(
  "contact.firstname",
  { required: true, min: 2, max: 50 },
  { label: t("common.firstname") }
);
const {
  value: lastname,
  errors: lastnameErrors,
  handleBlur: handleLastnameBlur,
} = useField<string>(
  "contact.lastname",
  { required: true, min: 2, max: 50 },
  { label: t("common.lastname") }
);
const {
  value: email,
  errors: emailErrors,
  handleBlur: handleEmailBlur,
} = useField<string>(
  "contact.email",
  { required: true, email: true },
  { label: t("task.email") }
);
const { value: isOpenApiVerbose, handleBlur: handleIsOpenApiVerboseBlur } =
  useField<boolean>("isOpenApiVerbose");
const {
  value: description,
  errors: descriptionErrors,
  handleBlur: handleDescriptionBlur,
} = useField<string>(
  "description",
  { max: 2000 },
  { label: t("task.description") }
);

const ckEditorConfig = reactive({
  language: locale,
  toolbar: [
    "bold",
    "italic",
    "|",
    "link",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "undo",
    "redo",
  ],
  link: {
    addTargetToExternalLinks: true,
  },
});
const language = watch(
  locale,
  (language) => (ckEditorConfig.language = language)
);
onUnmounted(() => language());
</script>

<template>
  <div class="field">
    <label>{{ $t("task.title") }}</label>
    <div class="ui left corner labeled input">
      <input v-model="title" type="text" @blur="handleTitleBlur" />
      <div class="ui left corner label">
        <i class="asterisk icon" />
      </div>
    </div>
    <BaseFormMessage :errors="titleErrors" />
  </div>

  <div class="three fields">
    <div class="field">
      <label>{{ $t("task.contact") }} {{ $t("common.firstname") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="firstname" type="text" @blur="handleFirstnameBlur" />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="firstnameErrors" />
    </div>

    <div class="field">
      <label>{{ $t("common.lastname") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="lastname" type="text" @blur="handleLastnameBlur" />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="lastnameErrors" />
    </div>

    <div class="field">
      <label>{{ $t("task.email") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="email" type="email" @blur="handleEmailBlur" />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="emailErrors" />
    </div>
  </div>

  <div class="field">
    <label>{{ $t("task.description-show") }}</label>
    <select
      v-model="isOpenApiVerbose"
      class="select"
      @blur="handleIsOpenApiVerboseBlur"
    >
      <option :value="true">{{ $t("common.answer", 1) }}</option>
      <option :value="false">{{ $t("common.answer", 0) }}</option>
    </select>
  </div>

  <div class="field">
    <label>{{ $t("task.description") }}</label>
    <ckeditor
      v-model="description"
      :editor="ClassicEditor"
      :config="ckEditorConfig"
      tag-name="textarea"
      @blur="handleDescriptionBlur"
    />
    <BaseFormMessage :errors="descriptionErrors" />
  </div>
</template>

<style scoped>
.select {
  appearance: none;
}
</style>
