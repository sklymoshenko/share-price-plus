<template>
  <q-item clickable class="q-pa-sm" :class="`${isClosed}`" @click="moveToEvent">
    <q-item-section class="text-left">
      <q-item-label class="text-subtitle1 ellipsis">{{ spEvent.name }}</q-item-label>
      <q-item-label caption> Totall: {{ spEvent.price }}. Each: {{ spEvent.each }}.</q-item-label>
      <q-item-label caption> You: {{ selfPaied }} </q-item-label>
    </q-item-section>

    <q-item-section side class="column justify-between">
      <q-item-label v-if="spEvent.createdAt" caption>{{ mainFormat(spEvent.createdAt) }}</q-item-label>
      <q-item-label v-if="spEvent.closedAt" caption>{{ mainFormat(spEvent.closedAt) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";

// Services
import { mainFormat } from "@/services/dates";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SpEvent",
  props: {
    spEvent: {
      type: Object as PropType<ISpEvent>,
      required: true
    },
    currentUser: {
      type: Object as PropType<ISpUser | null>,
      default: null
    }
  },
  setup(props) {
    const router = useRouter();
    const { spEvent, currentUser } = toRefs(props);
    const isClosed = computed(() => (spEvent.value.isClosed ? "closed-event" : ""));
    const selfPaied = computed(() => {
      return spEvent.value.participants.find((p) => p._id === currentUser.value?._id)?.paid || 0;
    });

    const moveToEvent = (): void => {
      router.push({ name: "Event", params: { id: spEvent.value._id } });
    };

    return { selfPaied, mainFormat, moveToEvent, isClosed };
  }
});
</script>

<style scoped>
.closed-event {
  background-color: #fbf5f5;
}
</style>
