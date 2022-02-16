<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden q-mt-lg"
    label="History"
    dense
    dense-toggle
    header-class="bg-accent text-white"
    expand-icon-class="text-white"
    @before-show="getEventHistory"
  >
    <div class="new column q-pa-sm">
      <div v-if="!history.length" class="empty-history">There is no history so far</div>
      <div class="full-history">
        <q-list bordered>
          <q-item v-for="(item, i) in mappedHistory" :key="i" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img :src="avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption lines="1" v-if="item.paid">{{ item.paid }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import avatar from "@/assets/avatar.png";

// Types
import { ISpEvent, ISpEventHistoryItem } from "@/types/entities/event";

// Services
import { safeMethod } from "@/services/safeMethod";
import { apolloClient } from "@/services/apollo";

// Gql
import { EVENTS_HISTORY_QUERY } from "@/gql/queries/spEvents";

export default defineComponent({
  name: "SpEventEditHistory",
  props: {
    eventId: {
      type: String as PropType<ISpEvent["_id"]>,
      required: true
    }
  },
  setup({ eventId }) {
    const history = ref<ISpEventHistoryItem[]>([]);

    const getEventHistory = async (): Promise<void> => {
      const result: { data: { spEvents: { history: ISpEventHistoryItem[] }[] } } = await apolloClient.query({
        query: EVENTS_HISTORY_QUERY,
        variables: {
          idIn: [eventId]
        }
      });

      history.value = result.data.spEvents[0].history;
    };

    const mappedHistory = computed(() => {
      const mapped = history.value.map((h) => {
        let item = {
          name: h.userName,
          action: "changed",
          paid: 0,
          date: h.createdAt
        };

        if (h.change.participants) {
          const participant = h.change.participants[0];
          item.name = participant.name;
          item.paid = participant.paid;
          item.action = "payed";
        }

        return item;
      });

      return mapped;
    });

    return { getEventHistory: () => safeMethod(getEventHistory), history, mappedHistory, avatar };
  }
});
</script>

<style scoped></style>
