<template>
  <div class="items-end sp-event-participants-info q-mt-lg">
    <div class="row items-end q-mt-sm" v-for="(participant, i) in eventParticipants" :key="i">
      <div class="sp-participant-name text-body text-bold q-mr-sm">{{ participant.name }}:</div>
      <div class="sp-participant-price text-body">{{ participant.paid }}</div>
      <div class="row items-end justify-center" v-if="participant.ows">
        <div class="sp-event-name text-subtitle2 q-ml-md q-mr-sm">Ows:</div>
        <div class="sp-event-price text-body">{{ participant.ows }}</div>
      </div>
    </div>
    <SpEventEditAddParticipants :sp-event="spEvent" @addParticipants="addParticipants" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";

// Types
import { IEventPayedPayload, ISpEvent } from "@/types/entities/event";
import { ISpParticipant } from "@/types/spPeopleConfig";

// Components
import SpEventEditAddParticipants from "./SpEventEditAddParticipants.vue";

export default defineComponent({
  name: "SpEventEditParticipants",
  components: { SpEventEditAddParticipants },
  emits: ["addParticipants"],
  props: {
    participants: {
      type: Array as PropType<IEventPayedPayload["participants"]>,
      required: true
    },
    selfParticipant: {
      type: Object as PropType<Omit<ISpParticipant, "exceed" | "loaners">>,
      required: true
    },
    spEvent: {
      type: Object as PropType<ISpEvent>,
      required: true
    }
  },
  setup(props, { emit }) {
    const { participants, selfParticipant } = toRefs(props);
    const eventParticipants = computed<IEventPayedPayload["participants"]>(() =>
      participants.value.filter((p) => p._id !== selfParticipant.value._id)
    );

    const addParticipants = (participants: Pick<ISpParticipant, "_id" | "name">) => {
      emit("addParticipants", participants);
    };

    return { eventParticipants, addParticipants };
  }
});
</script>

<style scoped></style>
