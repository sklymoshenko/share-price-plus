<template>
  <div class="column">
    <div class="col-12">
      <q-input
        v-model.number="peopleCount"
        type="tel"
        filled
        clearable
        @update:model-value="updatePeopleCount"
        :hint="'How many people had fun with me?'"
      />
    </div>

    <div class="row justify-center q-mt-md">
      <q-btn
        round
        color="primary"
        icon="arrow_downward"
        size="md"
        class="q-mr-md"
        @click="decreasePeopleCount"
        :disable="peopleCount === 2"
      />
      <q-btn round color="secondary" icon="arrow_upward" size="md" class="q-ml-md" @click="increasePeopleCount" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SpPeopleCount",
  props: {
    people: {
      type: Number,
      default: 2
    }
  },
  setup({ people }, { emit }) {
    const peopleCount = ref<number>(people);

    const updatePeopleCount = (value: number | string | null): void => {
      let newValue: number | string | null = value;

      // checking for null
      if (typeof newValue === "object") {
        newValue = 0;
      }

      emit("update:people", +newValue);
    };

    const increasePeopleCount = (): void => {
      peopleCount.value++;
      emit("update:people", peopleCount.value);
    };

    const decreasePeopleCount = (): void => {
      peopleCount.value--;
      emit("update:people", peopleCount.value);
    };

    return { peopleCount, updatePeopleCount, increasePeopleCount, decreasePeopleCount };
  }
});
</script>

<style scoped></style>
