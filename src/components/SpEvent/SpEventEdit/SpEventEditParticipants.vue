<template>
  <div class="items-end sp-event-participants-info q-mt-lg">
    <div class="row items-end q-mt-sm" v-for="(participant, i) in eventParticipants" :key="i">
      <div class="sp-participant-name text-body text-bold q-mr-sm">{{ participant.name }}:</div>
      <div class="sp-participant-price text-body">{{ participant.paid }}</div>
      <div class="row items-end justify-center" v-if="participant.ows">
        <div class="sp-event-name text-body q-ml-md q-mr-sm">Ows:</div>
        <div class="sp-event-price text-body">{{ participant.ows }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpParticipant } from "@/types/spPeopleConfig";

export default defineComponent({
  name: "SpEventEditParticipants",
  props: {
    participants: {
      type: Array as PropType<ISpEvent["participants"]>,
      required: true
    },
    selfParticipant: {
      type: Object as PropType<ISpParticipant>,
      required: true
    }
  },
  setup({ participants, selfParticipant }) {
    const eventParticipants = participants.filter((p) => p._id !== selfParticipant._id);
    return { eventParticipants };
  }
});
</script>

<style scoped></style>
