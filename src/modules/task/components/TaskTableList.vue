<template>
  <h4>{{ $t("task.parameter") }}</h4>
  <table class="ui celled table">
    <thead>
      <tr>
        <th>{{ $t("task.parameter-name") }}</th>
        <th>{{ $t("task.parameter-type") }}</th>
        <th>{{ $t("task.parameter-description") }}</th>
        <th>{{ $t("task.parameter-example") }}</th>
      </tr>
      <tr class="invisible">
        <th>{{ $t("task.response-http-status-code") }}</th>
        <th>{{ $t("task.response-content-type") }}</th>
        <th>{{ $t("task.response-description") }}</th>
        <th>{{ $t("task.response-example") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="parameter in mappedParameters" :key="parameter.uuid">
        <td>{{ parameter.name }}</td>
        <td>{{ parameter.type }}</td>
        <td>{{ parameter.description }}</td>
        <td>{{ parameter.example }}</td>
      </tr>
      <tr
        v-for="response in mappedResponses"
        :key="response.uuid"
        class="invisible"
      >
        <td>{{ response.httpStatusCode }}</td>
        <td>{{ response.contentType }}</td>
        <td>{{ response.description }}</td>
        <td>{{ response.example }}</td>
      </tr>
    </tbody>
  </table>

  <h4>{{ $tc("task.response", 2) }}</h4>
  <table class="ui celled table">
    <thead>
      <tr class="invisible">
        <th>{{ $t("task.parameter-name") }}</th>
        <th>{{ $t("task.parameter-type") }}</th>
        <th>{{ $t("task.parameter-description") }}</th>
        <th>{{ $t("task.parameter-example") }}</th>
      </tr>
      <tr>
        <th>{{ $t("task.response-http-status-code") }}</th>
        <th>{{ $t("task.response-content-type") }}</th>
        <th>{{ $t("task.response-description") }}</th>
        <th>{{ $t("task.response-example") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="parameter in mappedParameters"
        :key="parameter.uuid"
        class="invisible"
      >
        <td>{{ parameter.name }}</td>
        <td>{{ parameter.type }}</td>
        <td>{{ parameter.description }}</td>
        <td>{{ parameter.example }}</td>
      </tr>
      <tr v-for="response in mappedResponses" :key="response.uuid">
        <td>{{ response.httpStatusCode }}</td>
        <td>{{ response.contentType }}</td>
        <td>{{ response.description }}</td>
        <td>{{ response.example }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TaskTableList",
  props: {
    parameters: {
      type: Array,
      required: true,
    },
    responses: {
      type: Array,
      required: true,
    },
  },
  computed: {
    mappedParameters() {
      return this.parameters.map((parameter) => {
        return {
          ...parameter,
          type: parameter.type.toLowerCase(),
          description: parameter.description.length
            ? parameter.description
            : `${this.$t("task.parameter-description")} ${this.$tc(
                "common.available",
                0
              )}`,
        };
      });
    },
    mappedResponses() {
      let responses = this.responses;

      return responses
        .sort((first, second) => first.httpStatusCode - second.httpStatusCode)
        .map((response) => {
          return {
            ...response,
            httpStatusCode:
              response.httpStatusCode > 0
                ? response.httpStatusCode
                : `${this.$t("common.status")} ${this.$tc(
                    "common.available",
                    0
                  )}`,
          };
        });
    },
  },
};
</script>

<style scoped>
.invisible {
  visibility: collapse;
}
</style>
