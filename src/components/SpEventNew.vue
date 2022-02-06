<template>
  <div class="new column">
    <div class="text-h6 text-left q-mb-md">New Event</div>
    <q-input v-model="spEvent.name" filled clearable hint="Event Name" placeholder="'New Year'" />
    <q-select
      v-model="spEvent.participants"
      option-label="name"
      class="q-mt-md"
      filled
      multiple
      :options="participants"
      hint="Participans"
    />
    <div class="persons q-mt-lg row justify-right overflow-auto" style="max-height: 220px">
      <SpPersonItem
        v-for="participant of spEvent.participants"
        :key="participant._id"
        :name="participant.name"
        :paid="participant.paid"
        @delete="deleteParticipant(participant)"
      />
    </div>
    <q-btn
      :ripple="{ center: true }"
      color="secondary"
      label="Save"
      no-caps
      dense
      class="q-mt-lg"
      :loading="saveProgress"
      @click="createEvent"
      :disable="spEvent.name === '' || !spEvent.participants.length"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { apolloClient } from "@/services/apollo";
import gql from "graphql-tag";

// Components
import SpPersonItem from "./SpPersonItem.vue";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpParticipant } from "@/types/spPeopleConfig";
import { ISpUser } from "@/types/entities/user";
import { useMutation } from "@vue/apollo-composable";

const USERS_QUERY = gql`
  query SpUsersJson {
    spUsersJson {
      _id
      name
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($data: CreateEvent!) {
    createEvent(data: $data) {
      _id
      name
      each
      price
    }
  }
`;

export default defineComponent({
  components: { SpPersonItem },
  async setup() {
    const $q = useQuasar();
    const saveProgress = ref<boolean>(false);
    const route = useRouter();

    const spEvent = ref<Omit<ISpEvent, "_id">>({
      name: "",
      each: 0,
      isClosed: false,
      participants: [],
      peopleCount: 0,
      price: 0
    });

    const { mutate: createSpEvent, loading } = useMutation(CREATE_EVENT_MUTATION, {
      variables: { data: spEvent.value }
    });
    const createEvent = async (): Promise<void> => {
      try {
        const {
          data: { createEvent }
        } = (await createSpEvent()) as { data: { createEvent: ISpEvent } };

        $q.notify({
          message: "Event created!",
          type: "positive"
        });

        route.push({ name: "Events" });
      } catch (err: any) {
        $q.notify({
          message: err.message,
          type: "negative"
        });
      }
    };

    const getUsers = async (): Promise<ISpUser[]> => {
      // Gets error with type ApolloQueryResult<any>
      const {
        data: { spUsersJson }
      }: any | { data: { spUsersJson: ISpUser[] } } = await apolloClient.query({
        query: USERS_QUERY
      });

      return spUsersJson;
    };

    const participants: ISpUser[] = await getUsers();

    const deleteParticipant = (participant: ISpParticipant) => {
      spEvent.value.participants = spEvent.value.participants.filter((p) => p._id !== participant._id);
    };

    const simulateLoading = (): void => {
      saveProgress.value = true;

      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        saveProgress.value = false;
        $q.notify({
          message: "Event created!",
          type: "positive"
        });

        route.push({ name: "Events" });
      }, 3000);
    };
    return { spEvent, participants, deleteParticipant, createEvent, saveProgress, loading };
  }
});
</script>

<style scoped></style>
