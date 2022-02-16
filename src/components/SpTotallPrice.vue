<template>
  <div class="row">
    <div class="col-12">
      <q-input
        v-model.number="totallPrice"
        type="tel"
        filled
        clearable
        @update:model-value="updatePrice"
        maxlength="7"
        :hint="'Hmmmm how much did we spent this time?'"
        :rules="[(val) => val <= 1000000 || 'Wow, cant pay that much! Enter amount less or equal to 1M']"
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
      let newValue = value;

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
