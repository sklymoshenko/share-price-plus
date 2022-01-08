<template>
  <div class="row">
    <div class="col-12">
      <q-input
        v-model.number="totallPrice"
        type="number"
        filled
        clearable
        @update:model-value="updatePrice"
        :hint="'Hmmmm how much did we spent this time?'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SpTotallPrice",
  props: {
    price: {
      type: Number,
      default: 0
    }
  },
  setup({ price }, { emit }) {
    const totallPrice = ref<number>(price);

    const updatePrice = (value: number | string | null): void => {
      let newValue: number | string | null = value;

      // checking for null
      if (typeof newValue === "object") {
        newValue = 0;
      }

      emit("update:price", +newValue);
    };

    return { totallPrice, updatePrice };
  }
});
</script>

<style scoped></style>
