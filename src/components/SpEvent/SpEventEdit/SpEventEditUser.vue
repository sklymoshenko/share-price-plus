<template>
  <div class="event-current-user-info items-end justify-between q-mt-md">
    <div class="col">
      <div class="row items-end justify-center">
        <div class="sp-event-name text-h6 q-mr-md text-bold">{{ currentUser.name }}:</div>
        <div class="sp-event-price text-h4">{{ selfPaied }}</div>
      </div>
    </div>
    <div class="col" v-if="isOws">
      <div class="row items-end justify-center">
        <div class="sp-event-name text-h6 q-mr-md">Ows:</div>
        <div class="sp-event-price text-h4">{{ userOws }}</div>
      </div>
    </div>
    <div class="row items-center justify-between">
      <div class="col-8">
        <q-input
          v-model.number="userAdditionalPay"
          type="tel"
          filled
          dense
          clearable
          :hint="'Spend More'"
          class="q-mt-md"
        />
      </div>
      <div class="col-3 q-mb-xs">
        <q-btn color="primary" icon="add" @click="addAdditionalPayment" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { ISpParticipant } from "@/types/spPeopleConfig";

export default defineComponent({
  name: "SpEventEditUser",
  emits: ["addAdditionalPayment"],
  props: {
    currentUser: {
      type: Object as PropType<ISpUser>,
      required: true
    },
    selfParticipant: {
      type: Object as PropType<ISpParticipant>,
      required: true
    },
    each: {
      type: Number as PropType<ISpEvent["each"]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const { currentUser, selfParticipant, each } = toRefs(props);
    const selfPaied = computed<number>(() => selfParticipant.value.paid);

    const userOws = computed<number>(() => each.value - selfPaied.value);
    const isOws = computed<boolean>(() => userOws.value > 0);
    const userAdditionalPay = ref(0);

    const addAdditionalPayment = () => {
      emit("addAdditionalPayment", userAdditionalPay.value);
      userAdditionalPay.value = 0;
    };

    return { currentUser, each, userAdditionalPay, userOws, isOws, selfPaied, addAdditionalPayment };
  }
});
</script>

<style scoped></style>
