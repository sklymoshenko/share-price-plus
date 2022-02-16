<template>
  <div class="new column">
    <div class="text-h6 text-left q-mb-md">New Event</div>
    <q-input
      v-model="spEvent.name"
      filled
      clearable
      hint="Event Name*"
      placeholder="'New Year'"
      :rules="[(val) => (val !== null && val !== '') || 'Enter a event name!']"
    />
    <q-select
      v-model="spEvent.participants"
      option-label="name"
      class="q-mt-md"
      filled
      multiple
      :options="participants"
      hint="Participans*"
    />
    <div class="persons q-mt-lg row justify-right overflow-auto" style="max-height: 220px">
      <SpPersonItem
        v-for="participant of spEvent.participants"
        :key="participant._id"
        :name="participant.name"
        :paid="participant.paid"
        :deletable="participant._id !== currentUser._id"
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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "@/store/store";
import gql from "graphql-tag";

// Components
import SpPersonItem from "../SpPersonItem.vue";

// Types
import { ISpEventCreate } from "@/types/entities/event";
import { ISpParticipantUpload } from "@/types/spPeopleConfig";
import { ISpUser } from "@/types/entities/user";

// Services
import { safeMethod } from "@/services/safeMethod";
import { getUsers } from "@/services/queries";

// Gql
const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($data: CreateEvent!) {
    createEvent(data: $data) {
      _id
      name
      price
      each
      peopleCount
      isClosed
      closedAt
      createdAt
      updatedAt
    }
  }
`;

export const USERS_QUERY = gql`
  query SpUsers($idIn: [ID!], $spUsersId: String) {
    spUsers(_id_in: $idIn, id: $spUsersId) {
      _id
      name
    }
  }
`;

export default defineComponent({
  name: "SpEventNew",
  components: { SpPersonItem },
  props: {
    currentUser: {
      type: Object as PropType<ISpUser>,
      required: true
    }
  },
  async setup({ currentUser }) {
    const $q = useQuasar();
    const saveProgress = ref<boolean>(false);
    const route = useRouter();
    const store = useStore();

    const participants = ref<Pick<ISpUser, "_id" | "name">[]>([]);

    const spEvent = ref<ISpEventCreate>({
      name: "",
      participants: [{ _id: currentUser._id, paid: 0, name: currentUser.name }]
    });

    const { mutate: createSpEvent, loading } = useMutation(CREATE_EVENT_MUTATION, {
      variables: { data: spEvent.value }
    });

    const createEvent = async (): Promise<void> => {
      if (!spEvent.value.name) {
        throw Error("Enter a event name");
      }

      if (spEvent.value.participants?.length === 1) {
        throw new Error("You need to share with someone! Add participants.");
      }

      await createSpEvent();
      await store.dispatch("getUserEventsIds", currentUser._id);
      $q.notify({
        message: "Event created!",
        type: "positive"
      });
      route.push({ name: "Events" });
    };

    const getUsersOptions = async (): Promise<void> => {
      try {
        participants.value = await getUsers({ options: { idIn: currentUser.friends || [] }, query: USERS_QUERY });
      } catch (err: any) {
        $q.notify({
          message: err.message,
          type: "negative"
        });
      }
    };

    await safeMethod(getUsersOptions);

    const deleteParticipant = (participant: ISpParticipantUpload | ISpUser) => {
      spEvent.value.participants = spEvent.value.participants?.filter((p) => p._id !== participant._id);
    };

    return {
      spEvent,
      participants,
      deleteParticipant,
      createEvent: () => safeMethod(createEvent),
      saveProgress,
      loading
    };
  }
});
</script>

<style scoped></style>
