<template>
  <q-item clickable class="q-pa-lg" :to="{ name: 'Event', params: { id: spEvent.id } }">
    <q-item-section class="text-left">
      <q-item-label class="text-subtitle1 ellipsis">{{ spEvent.name }}</q-item-label>
      <q-item-label caption> Totall: {{ spEvent.price }}. Each: {{ spEvent.each }}.</q-item-label>
      <q-item-label caption> You: {{ selfPaied }} </q-item-label>
    </q-item-section>

    <q-item-section side class="column justify-between">
      <q-item-label caption>{{ spEvent._createdAt }}</q-item-label>
      <q-item-label v-if="spEvent.isClosed" caption>{{ spEvent._closedAt }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";

export default defineComponent({
  name: "SpEvent",
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
    const selfPaied = computed(() => {
      return spEvent.participants.find((p) => p.id === currentUser.id)?.paid || 0;
    });
    return { selfPaied };
  }
});
</script>

<style scoped></style>
