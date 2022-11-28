<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :initial-values="initialValues"
    class="ui form"
  >
    <div class="field">
      <label>Benutzername</label>
      <VeeField name="username" type="text" placeholder="Name" />
    </div>

    <div class="field">
      <label>JMS-Queue</label>
      <VeeField name="jmsQueue" type="text" placeholder="Name" />
    </div>

    <div class="field">
      <label>Bestanden</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" value="PASSED" />
            <label>Ja</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" value="NOT_PASSED" />
            <label>Nein</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="hasPassed" type="radio" :value="null" />
            <label>Beide</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>Typ</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" value="EXAMPLE" />
            <label>Beispiel</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" value="REGULAR" />
            <label>Regulär</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <VeeField name="type" type="radio" :value="null" />
            <label>Beide</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>Anfragen</label>
      <div class="two fields">
        <div class="field">
          <VeeField
            name="minRequests"
            type="number"
            min="0"
            step="1"
            placeholder="Min"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
          />
        </div>
        <div class="field">
          <VeeField
            name="maxRequests"
            type="number"
            min="0"
            step="1"
            placeholder="Max"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <label>Student</label>
      <div class="two fields">
        <div class="field">
          <VeeField name="studentFirstname" type="text" placeholder="Vorname" />
        </div>
        <div class="field">
          <VeeField name="studentLastname" type="text" placeholder="Nachname" />
        </div>
      </div>
    </div>

    <div v-if="banks.length" class="grouped fields">
      <label>Banken</label>
      <div v-for="bank in banks" :key="bank.uuid" class="field">
        <div class="ui checkbox">
          <VeeField name="banks" type="checkbox" :value="bank.name" />
          <label>{{ bank.name }}</label>
        </div>
      </div>
    </div>

    <div class="ui fluid buttons">
      <button class="ui olive button" @click="handleSubmit($event, onSubmit)">
        Suchen
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
