<script setup lang="ts">
import type { Endpoint } from "@hennihaus/bamconfigbackend";

defineProps<{ endpoints: Endpoint[] }>();
</script>

<template>
  <h4>{{ $t("task.endpoint", 2) }}</h4>
  <template v-for="endpoint in endpoints" :key="endpoint.uuid">
    <div>
      {{ endpoint.type }}-{{ $t("task.endpoint", 1) }}:&nbsp;
      <a v-if="endpoint.url" :href="endpoint.url" target="_blank">
        {{ endpoint.url }}
      </a>
      <template v-else>
        {{ $t("common.hint") }} {{ $t("task.documentation") }}
      </template>
    </div>
    <div>
      {{ endpoint.type }}-{{ $t("task.documentation") }}:&nbsp;
      <a v-if="endpoint.docsUrl" :href="endpoint.docsUrl" target="_blank">
        {{ endpoint.docsUrl }}
      </a>
      <template v-else>{{ $t("common.available", 0) }}</template>
    </div>
  </template>
</template>
