<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :initial-values="initialValues"
    class="ui form"
  >
    <div class="field">
      <label>{{ $t("team.username") }}</label>
      <VeeField :placeholder="$t('common.name')" name="username" type="text" />
    </div>

    <div class="field">
      <label>{{ $t("team.jms-queue") }}</label>
      <VeeField :placeholder="$t('common.name')" name="jmsQueue" type="text" />
    </div>

    <div class="field">
      <label>{{ $tc("team.passed", 1) }}</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" value="PASSED" />
            <label>{{ $tc("team.passed-checkbox", 1) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" value="NOT_PASSED" />
            <label>{{ $tc("team.passed-checkbox", 0) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" :value="null" />
            <label>{{ $tc("team.passed-checkbox", 2) }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $tc("team.type") }}</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" value="EXAMPLE" />
            <label>{{ $tc("team.type-checkbox", 0) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" value="REGULAR" />
            <label>{{ $tc("team.type-checkbox", 1) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" :value="null" />
            <label>{{ $tc("team.type-checkbox", 2) }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $tc("team.request", 2) }}</label>
      <div class="two fields">
        <div class="field">
          <VeeField
            :placeholder="$t('team.request-min-placeholder')"
            name="minRequests"
            type="number"
            min="0"
            step="1"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
          />
        </div>
        <div class="field">
          <VeeField
            :placeholder="$t('team.request-max-placeholder')"
            name="maxRequests"
            type="number"
            min="0"
            step="1"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $tc("team.student", 1) }}</label>
      <div class="two fields">
        <div class="field">
          <VeeField
            :placeholder="$t('team.student-firstname')"
            name="studentFirstname"
            type="text"
          />
        </div>
        <div class="field">
          <VeeField
            :placeholder="$t('team.student-lastname')"
            name="studentLastname"
            type="text"
          />
        </div>
      </div>
    </div>

    <div v-if="banks.length" class="grouped fields">
      <label>{{ $tc("core.bank", 2) }}</label>
      <div v-for="bank in banks" :key="bank.uuid" class="field">
        <div class="ui checkbox">
          <VeeField name="banks" type="checkbox" :value="bank.name" />
          <label>{{ bank.name }}</label>
        </div>
      </div>
    </div>

    <div class="ui fluid buttons">
      <button class="ui olive button" @click="handleSubmit($event, onSubmit)">
        {{ $t("common.search") }}
      </button>
      <button
        class="ui orange icon reset button"
        @click="handleSubmit($event, onReset)"
      >
        <i class="undo icon" />
      </button>
    </div>
  </VeeForm>
</template>

<script>
import { Field as VeeField, Form as VeeForm } from "vee-validate";

export default {
  name: "TeamListFilter",
  components: {
    VeeForm,
    VeeField,
  },
  props: {
    banks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      initialValues: {
        type: null,
        username: "",
        jmsQueue: "",
        hasPassed: null,
        minRequests: null,
        maxRequests: null,
        studentFirstname: "",
        studentLastname: "",
        banks: [],
        ...this.$route.query,
      },
    };
  },
  methods: {
    onReset(values, { resetForm }) {
      resetForm();
      this.$router.push({ name: "TeamList" });
    },
    onSubmit(values) {
      const query = this.buildQuery(values);

      this.$router.push({
        name: "TeamList",
        query,
      });
    },
    buildQuery(values) {
      const query = { ...values };

      delete query.cursor;

      if (!query.type) {
        delete query.type;
      }
      if (!query.username) {
        delete query.username;
      }
      if (!query.jmsQueue) {
        delete query.jmsQueue;
      }
      if (!query.hasPassed) {
        delete query.hasPassed;
      }
      if (!query.minRequests) {
        delete query.minRequests;
      }
      if (!query.maxRequests) {
        delete query.maxRequests;
      }
      if (!query.studentFirstname) {
        delete query.studentFirstname;
      }
      if (!query.studentLastname) {
        delete query.studentLastname;
      }
      if (!query.banks.length) {
        delete query.banks;
      }
      if (
        query.minRequests &&
        query.maxRequests &&
        +query.minRequests > +query.maxRequests
      ) {
        delete query.minRequests;
        delete query.maxRequests;
      }

      return query;
    },
  },
};
</script>

<style scoped>
.reset {
  flex: 0 0 auto !important;
}
</style>
