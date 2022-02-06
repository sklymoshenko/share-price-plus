<template>
  <div>
    <div class="events-bar row justify-between">
      <div class="text-h6 text-left">Events</div>
      <q-page-sticky position="top-right" :offset="[50, 1]">
        <q-btn color="primary" icon="add" :to="{ name: 'Event', params: { id: 'new' } }" />
      </q-page-sticky>
    </div>
    <div style="width: 100%" class="q-mt-md">
      <q-list separator>
        <SpEventItem v-for="event in events" :key="event._id" :sp-event="event" :current-user="currentUser" />
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/store";
import { useQuery, useResult } from "@vue/apollo-composable";

// Components
import SpEventItem from "@/components/SpEventItem.vue";

// Types
import { ISpUser } from "@/types/entities/user";

// Mocks
import gql from "graphql-tag";
import { ISpEvent } from "@/types/entities/event";

const EVENTS_QUERY = gql`
  query SpEvents($idIn: [ID!]) {
    spEvents(_id_in: $idIn) {
      _id
      name
      price
      each
      peopleCount
      participants {
        _id
        name
        paid
        ows
        exceed
        loaners {
          _id
          name
          paid
        }
      }
      isClosed
      closedAt
      createdAt
      updatedAt
    }
  }
`;

export default defineComponent({
  name: "SpEvents",
  setup() {
    const store = useStore();
    const currentUser = computed((): ISpUser | null => store.state.currentUser);

    const { result } = useQuery<{ spEvents: ISpEvent[] }>(EVENTS_QUERY, {
      variables: { idIn: currentUser.value?._id }
    });
    const events = useResult(result, [], (data) => data.spEvents);

    return { events, currentUser };
  },
  components: { SpEventItem }
});
</script>

<style scoped></style>
