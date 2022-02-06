<template>
  <SpEventEditMainInfo :totalPrice="spEvent.price" :name="spEvent.name" :each="spEvent.each" />
  <hr />
  <SpEventEditUser
    :currentUser="currentUser"
    :selfParticipant="selfParticipant"
    :each="spEvent.each"
    @addAdditionalPayment="addAdditionalPayment"
  />
  <SpEventEditParticipants :participants="spEvent.participants" :selfParticipant="selfParticipant" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { ISpParticipant } from "@/types/spPeopleConfig";

//Components
import SpEventEditMainInfo from "./SpEventEditMainInfo.vue";
import SpEventEditUser from "./SpEventEditUser.vue";
import SpEventEditParticipants from "./SpEventEditParticipants.vue";

export default defineComponent({
  name: "SpEventEdit",
  components: { SpEventEditMainInfo, SpEventEditUser, SpEventEditParticipants },
  props: {
    spEvent: {
      type: Object as PropType<ISpEvent>,
      required: true
    },
    currentUser: {
      type: Object as PropType<ISpUser>,
      required: true
    }
  },
  setup({ spEvent, currentUser }) {
    const selfParticipant = computed<ISpParticipant>(
      () => spEvent.participants.find((p) => p._id === currentUser?._id)!
    );

    const addAdditionalPayment = () => {};

    return {
      spEvent,
      currentUser,
      addAdditionalPayment,
      selfParticipant
    };
  }
});
</script>

<style scoped></style>
