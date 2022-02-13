<template>
  <div class="items-end sp-event-main-info">
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">{{ name }}:</div>
        <div class="sp-event-price text-h4" :class="classPrice">{{ totalPrice }}</div>
      </div>
    </div>
    <div class="col">
      <div class="row items-end justify-between">
        <div class="sp-event-name text-h6 q-mr-sm">Each:</div>
        <div class="sp-event-price text-h4" :class="classEach">{{ each }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from "vue";

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
  setup(props) {
    const { totalPrice, each } = toRefs(props);
    let timerPrice = ref(null);
    let timerEach = ref(null);
    const changingTextClass = "text-accent";
    const classPrice = ref("");
    const classEach = ref("");

    watch(totalPrice, (newVal, oldVal) => {
      if (oldVal === newVal) return;
      if (timerPrice.value) clearTimeout(timerPrice.value);

      classPrice.value = changingTextClass;
      setTimeout(() => {
        classPrice.value = "";
      }, 1000);
    });

    watch(each, (newVal, oldVal) => {
      if (oldVal === newVal) return;
      if (timerEach.value) clearTimeout(timerEach.value);

      classEach.value = changingTextClass;
      setTimeout(() => {
        classEach.value = "";
      }, 1000);
    });

    return { classPrice, classEach };
  }
});
</script>

<style scoped>
.sp-event-price {
  transition: text 0.7s ease-in-out;
}
</style>
