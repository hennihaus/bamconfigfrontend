<script setup lang="ts">
import { useField } from "vee-validate";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";

const { t } = useBaseI18n();

const { value: isAsync } = useField<boolean>("isAsync");

const { value: isActive, handleBlur: handleIsActiveBlur } =
  useField<boolean>("isActive");

const {
  value: thumbnailUrl,
  errors: thumbnailUrlErrors,
  handleBlur: handleThumbnailUrlBlur,
} = useField<string>(
  "thumbnailUrl",
  { required: true, url: true },
  { label: t("bank.thumbnail-url") }
);
</script>

<template>
  <div v-if="isAsync" class="field">
    <label for="isActive">{{ $t("common.status") }}</label>
    <select
      id="isActive"
      v-model="isActive"
      class="select"
      @blur="handleIsActiveBlur"
    >
      <option :value="true" :selected="isActive">
        {{ $t("bank.active-status", 1) }}
      </option>
      <option :value="false" :selected="!isActive">
        {{ $t("bank.active-status", 0) }}
      </option>
    </select>
  </div>

  <div class="field">
    <label for="thumbnailUrl">{{ $t("bank.thumbnail-url") }}</label>
    <div class="ui left corner labeled input">
      <input
        id="thumbnailUrl"
        v-model="thumbnailUrl"
        type="url"
        @blur="handleThumbnailUrlBlur"
      />
      <div class="ui left corner label">
        <i class="asterisk icon" />
      </div>
    </div>
    <BaseFormMessage :errors="thumbnailUrlErrors" />
  </div>
</template>

<style scoped>
.select {
  appearance: none;
}
</style>
