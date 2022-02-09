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
import { ISpEvent, ISpEventUpload } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { ISpParticipant } from "@/types/spPeopleConfig";

//Components
import SpEventEditMainInfo from "./SpEventEditMainInfo.vue";
import SpEventEditUser from "./SpEventEditUser.vue";
import SpEventEditParticipants from "./SpEventEditParticipants.vue";
import { useStore } from "@/store/store";

// lodash
// @ts-ignore
import cloneDeep from "lodash/cloneDeep";

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
    const store = useStore();
    const selfParticipant = computed<ISpParticipant>(
      () => spEvent.participants.find((p) => p._id === currentUser?._id)!
    );

    const addAdditionalPayment = async (paid: ISpParticipant["paid"]): Promise<void> => {
      const participants: ISpParticipant[] = cloneDeep(spEvent.participants);
      const participant = participants.find((p) => p._id === currentUser?._id)!;
      participant.paid += paid;

      const payload: { updateEventId: ISpEvent["_id"]; data: ISpEventUpload } = {
        updateEventId: spEvent._id,
        data: {
          participants: participants
        }
      };

      await store.dispatch("updateEvent", payload);
    };

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
