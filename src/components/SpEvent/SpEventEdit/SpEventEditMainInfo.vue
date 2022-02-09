<template>
  <div class="items-end sp-event-main-info">
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">{{ name }}:</div>
        <div class="sp-event-price text-h4">{{ total }}</div>
      </div>
    </div>
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">Each:</div>
        <div class="sp-event-price text-h4">{{ eachPayed }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { useSubscription } from "@vue/apollo-composable";

// Types
import { ISpEvent } from "@/types/entities/event";
import { EVENT_PAYED_SUBSCRIPTION } from "@/gql/subscriptions/eventPayed";

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
  setup({ totalPrice, each }) {
    const total = ref(totalPrice);
    const eachPayed = ref(each);
    const { result } = useSubscription(EVENT_PAYED_SUBSCRIPTION);

    watch(result, ({ eventPayed }) => {
      total.value = eventPayed.total;
      eachPayed.value = eventPayed.each;
    });

    return { total, eachPayed };
  }
});
</script>

<style scoped></style>
