<template>
  <div class="column">
    <q-input
      v-model="person.name"
      filled
      clearable
      dense
      :hint="'Name of a fellow'"
      placeholder="'Chuck'"
      :disable="disableInputs"
    />
    <q-input
      v-model.number="person.paid"
      type="tel"
      filled
      dense
      clearable
      :hint="'Amount of shakels that fellow has spent'"
      class="q-mt-md"
      :disable="disableInputs"
    />
    <q-btn
      :ripple="{ center: true }"
      color="secondary"
      :label="btnLabel"
      no-caps
      dense
      class="q-mt-lg"
      @click="confirmModeAction"
      :disable="disableInputs"
    />
    <div class="persons q-mt-lg row justify-right" style="max-height: 220px">
      <SpPersonItem
        v-for="conf of peopleConfig"
        :key="conf.id"
        :name="conf.name"
        :paid="conf.paid"
        @click="startEditingPerson(conf)"
        @delete="deletePerson(conf)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ISpPersonConfig, Modes } from "../types/spPeopleConfig";
import { computed, defineComponent, PropType, ref } from "vue";
import SpPersonItem from "./SpPersonItem.vue";

export default defineComponent({
  name: "SpPeopleConfig",
  components: { SpPersonItem },
  emits: ["update:peopleConfig"],
  props: {
    peopleCount: {
      type: Number
    },
    peopleConfig: {
      type: Array as PropType<ISpPersonConfig[]>,
      default: []
    }
  },
  setup({ peopleCount, peopleConfig }, { emit }) {
    const person = ref<ISpPersonConfig>({
      name: "",
      paid: 0,
      id: "",
      ows: 0,
      exceed: 0,
      loaners: []
    });
    const persons = ref<ISpPersonConfig[]>([...peopleConfig]);
    const mode = ref<Modes>("new");

    const btnLabel = computed((): string => {
      return mode.value === "new" ? "Confirm" : "Save";
    });

    const disableInputs = computed((): boolean => {
      return persons.value.length === peopleCount && mode.value === "new";
    });

    const confirmModeAction = (): void => {
      if (mode.value === "new") {
        addPersonToConfig();
        return;
      }

      editPersonsConfig();
    };

    const editPersonsConfig = (): void => {
      const neededPerson = persons.value.find((p) => p.id === person.value.id);
      if (!neededPerson) {
        resetPerson();
        return;
      }

      neededPerson.name = person.value.name;
      neededPerson.paid = person.value.paid;

      emit("update:peopleConfig", persons.value);

      // Correct increment id for new person
      person.value.id = String(persons.value.length);

      resetPerson();
    };

    const addPersonToConfig = (): void => {
      const id = String(person.value.id + 1);
      const name = person.value.name || `Person ${id}`;
      persons.value.push({ name, paid: person.value.paid, id, ows: 0, exceed: 0, loaners: [] });

      emit("update:peopleConfig", persons.value);

      // Correct increment id for new person
      person.value.id = String(persons.value.length);

      resetPerson();
    };

    const startEditingPerson = (pers: ISpPersonConfig): void => {
      mode.value = "edit";
      person.value.name = pers.name;
      person.value.paid = pers.paid;
      person.value.id = pers.id;
    };

    const resetPerson = () => {
      // Reset Person
      person.value.name = "";
      person.value.paid = 0;
      mode.value = "new";
    };

    const deletePerson = (pers: ISpPersonConfig) => {
      persons.value = persons.value.filter((p) => p.id !== pers.id);

      emit("update:peopleConfig", persons.value);

      // Correct increment id for new person
      person.value.id = String(persons.value.length + 1);

      resetPerson();
    };

    return { person, persons, startEditingPerson, mode, btnLabel, confirmModeAction, deletePerson, disableInputs };
  }
});
</script>

<style scoped></style>
