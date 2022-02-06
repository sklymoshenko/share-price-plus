<template>
  <div class="items-end sp-event-main-info">
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">{{ name }}:</div>
        <div class="sp-event-price text-h4">{{ totalPrice }}</div>
      </div>
    </div>
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">Each:</div>
        <div class="sp-event-price text-h4">{{ each }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

// Types
import { ISpEvent } from "@/types/entities/event";

export default defineComponent({
  name: "SpEventEditMainInfo",
  props: {
    totalPrice: {
      type: Number as PropType<ISpEvent["price"]>,
      required: true
    },
    each: {
      type: Number as PropType<ISpEvent["each"]>,
      required: true
    },
    name: {
      type: String as PropType<ISpEvent["name"]>
    }
  },
  setup({ totalPrice, each, name }) {
    return { totalPrice, each };
  }
});
</script>

<style scoped></style>
