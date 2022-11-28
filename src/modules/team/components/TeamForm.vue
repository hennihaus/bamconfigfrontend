<template>
  <VeeForm
    v-slot="{ meta, isSubmitting, setFieldValue, validateField }"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    class="ui form"
    @submit="onSubmit"
  >
    <div class="two fields">
      <div class="field">
        <label>Username</label>
        <VeeField v-slot="{ field, errors }" name="username">
          <div class="ui left corner labeled input">
            <input v-bind="field" type="text" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>

      <div class="field">
        <label class="save">Speichern</label>
        <button
          :disabled="isSubmitting"
          :class="[meta.valid ? 'green' : 'red']"
          class="ui fluid button"
        >
          Team speichern
        </button>
      </div>
    </div>

    <div class="two fields">
      <div class="field">
        <label>JMS-Queue</label>
        <VeeField v-slot="{ field, errors }" name="jmsQueue">
          <div class="ui left corner labeled input">
            <input v-bind="field" type="text" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>

      <div class="field">
        <label>Passwort</label>
        <VeeField v-slot="{ field, errors }" name="password">
          <div class="ui action input left corner labeled">
            <input v-bind="field" type="text" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
            <button
              type="button"
              class="ui button"
              @click="setFieldValue('password', generatePassword())"
            >
              Generieren
            </button>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>
    </div>

    <div class="field">
      <label>Studenten</label>
      <VeeFieldArray v-slot="{ fields, push, remove, replace }" name="students">
        <div v-for="(entry, idx) in fields" :key="entry.key" class="two fields">
          <div class="field">
            <VeeField
              v-slot="{ field, errors }"
              :name="`students[${idx}].firstname`"
            >
              <input
                v-bind="field"
                placeholder="Vorname"
                type="text"
                @blur="validateField(`students[${idx}].lastname`)"
              />
              <BaseFormMessage :errors="errors" />
            </VeeField>
          </div>
          <div class="field">
            <VeeField
              v-slot="{ field, errors }"
              :name="`students[${idx}].lastname`"
            >
              <div class="ui action input">
                <input
                  v-bind="field"
                  placeholder="Nachname"
                  type="text"
                  @blur="validateField(`students[${idx}].lastname`)"
                />
                <button
                  type="button"
                  class="ui green icon button"
                  @click="push(createStudent())"
                >
                  <i class="add icon" />
                </button>
                <button
                  type="button"
                  class="ui red icon button"
                  @click="removeStudent(idx, fields.length, remove, replace)"
                >
                  <i class="trash icon" />
                </button>
              </div>
              <BaseFormMessage :errors="errors" />
            </VeeField>
          </div>
        </div>
      </VeeFieldArray>
    </div>

    <VeeField v-slot="{ handleChange, value }" name="statistics">
      <BaseDragDrop
        :selected="value"
        :unselected="unselectedBanks"
        @on-drop-selected="handleChange($event, false)"
      >
        <template #selectedLabel>
          <label class="custom-label">
            <u>Zu</u> migrierende Banken (Drag & Drop)
          </label>
        </template>

        <template #unselectedLabel>
          <label class="custom-label">
            <u>Nicht zu</u> migrierende Banken (Drag & Drop)
          </label>
        </template>
      </BaseDragDrop>
    </VeeField>
    <p />
  </VeeForm>
</template>

<script>
import {
  Field as VeeField,
  FieldArray as VeeFieldArray,
  Form as VeeForm,
} from "vee-validate";
import BaseDragDrop from "@/modules/base/components/BaseDragDrop.vue";
import { v4 as uuid } from "uuid";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";

export default {
  name: "TeamForm",
  components: {
    BaseFormMessage,
    BaseDragDrop,
    VeeForm,
    VeeField,
    VeeFieldArray,
  },
  props: {
    team: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
    banks: {
      type: Array,
      required: true,
    },
  },
  emits: ["submitTeam"],
  setup(props) {
    const passwordLength = import.meta.env.VITE_PASSWORD_LENGTH;
    const passwordSequence = import.meta.env.VITE_PASSWORD_SEQUENCE;
    if (props.team) {
      return {
        initialValues: {
          uuid: props.team.uuid,
          type: props.team.type,
          username: props.team.username,
          password: props.team.password,
          jmsQueue: props.team.jmsQueue,
          students: props.team.students.length
            ? props.team.students
            : [{ uuid: uuid(), firstname: "", lastname: "" }],
          statistics: Object.keys(props.team.statistics),
        },
        passwordLength,
        passwordSequence,
      };
    }
    return {
      initialValues: {
        uuid: uuid(),
        type: "REGULAR",
        username: "",
        password: "",
        jmsQueue: "",
        students: [
          {
            uuid: uuid(),
            firstname: "",
            lastname: "",
          },
        ],
        statistics: [],
      },
      passwordLength,
      passwordSequence,
    };
  },
  data() {
    return {
      students: 1,
    };
  },
  computed: {
    unselectedBanks() {
      if (this.team) {
        return this.banks
          .map((bank) => bank.name)
          .filter((bank) => !Object.keys(this.team.statistics).includes(bank));
      }
      return this.banks.map((bank) => bank.name);
    },
    validationSchema() {
      const studentFirstnames = Array.from(Array(this.students))
        .map((_, index) => `students[${index}].firstname`)
        .map((key, index) => ({
          [key]: {
            requiredName: [`@students[${index}].lastname`, "Vorname"],
            minOptional: 2,
            maxOptional: 50,
          },
        }))
        .reduce((target, source) => Object.assign(target, source), {});

      const studentLastnames = Array.from(Array(this.students))
        .map((_, index) => `students[${index}].lastname`)
        .map((key, index) => ({
          [key]: {
            requiredName: [`@students[${index}].firstname`, "Nachname"],
            minOptional: 2,
            maxOptional: 50,
          },
        }))
        .reduce((target, source) => Object.assign(target, source), {});

      return {
        username: {
          required: true,
          min: 6,
          max: 50,
          uniqueUsername: [this.initialValues.uuid, this.$teamApi],
        },
        password: {
          required: true,
          min: 10,
          max: 50,
          uniquePassword: [this.initialValues.uuid, this.$teamApi],
        },
        jmsQueue: {
          required: true,
          min: 6,
          max: 50,
          uniqueJmsQueue: [this.initialValues.uuid, this.$teamApi],
        },
        ...studentFirstnames,
        ...studentLastnames,
      };
    },
  },
  methods: {
    generatePassword() {
      let text = "";
      for (let i = 0; i < this.passwordLength; i++) {
        text = `${text}${this.passwordSequence.charAt(
          Math.floor(Math.random() * this.passwordSequence.length)
        )}`;
      }
      return text;
    },
    createStudent() {
      this.students++;
      return {
        uuid: uuid(),
        firstname: "",
        lastname: "",
      };
    },
    removeStudent(index, length, remove, replace) {
      if (index === 0 && length === 1) {
        replace([this.createStudent()]);
        this.students = 1;
      } else {
        remove(index);
        this.students--;
      }
    },
    onSubmit(value) {
      const students = value.students.filter(
        (student) => student.firstname && student.lastname
      );
      const statistics = value.statistics
        .map((bank) => {
          if (this.team && this.team.statistics[bank]) {
            return { [bank]: this.team.statistics[bank] };
          }
          return { [bank]: 0 };
        })
        .reduce((target, source) => Object.assign(target, source), {});

      const team = { ...value, students, statistics };

      this.$emit("submitTeam", team);
    },
  },
};
</script>

<style scoped>
.custom-label {
  font-size: 13px;
  font-weight: bold;
}

.save {
  visibility: hidden;
}
</style>
