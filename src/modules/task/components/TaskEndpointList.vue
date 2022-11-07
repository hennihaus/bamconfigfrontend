<template>
  <h4>Endpunkte</h4>
  <template v-for="endpoint in endpoints" :key="endpoint.uuid">
    <div>
      {{ endpoint.type }}-Schnittstelle:&nbsp;
      <a v-if="endpoint.url" :href="endpoint.url" target="_blank">
        {{ endpoint.url }}
      </a>
      <template v-else>siehe Doku</template>
    </div>
    <div>
      {{ endpoint.type }}-Doku:&nbsp;
      <a v-if="endpoint.docsUrl" :href="endpoint.docsUrl" target="_blank">
        {{ endpoint.docsUrl }}
      </a>
      <template v-else>nicht vorhanden</template>
    </div>
  </template>
</template>

<script>
export default {
  name: "TaskEndpointList",
  props: {
    endpoints: {
      type: Array,
      required: true,
    },
  },
};
</script>
