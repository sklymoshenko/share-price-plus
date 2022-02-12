<template>
  <q-expansion-item
    v-if="possibleParticipants.length"
    class="shadow-1 overflow-hidden q-mt-lg"
    label="Add participants"
    header-class="bg-primary text-white"
    expand-icon-class="text-white"
  >
    <div class="new column q-pa-sm">
      <q-select
        v-model="participants"
        option-label="name"
        class="q-mt-md"
        filled
        multiple
        :options="possibleParticipants"
        hint="Participans"
      />
      <q-btn
        :ripple="{ center: true }"
        color="secondary"
        label="Save"
        no-caps
        dense
        class="q-mt-lg"
        @click="addParticipants"
      />
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";
import { apolloClient } from "@/services/apollo";
import gql from "graphql-tag";

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";

import { ISpParticipant } from "@/types/spPeopleConfig";

const USERS_QUERY = gql`
  query SpUsersJson {
    spUsersJson {
      _id
      name
    }
  }
`;

export default defineComponent({
  name: "SpEventEditAddParticipant",
  emits: ["addParticipants"],
  props: {
    spEvent: {
      type: Object as PropType<ISpEvent>,
      required: true
    }
  },
  async setup(props, { emit }) {
    const { spEvent } = toRefs(props);
    const participants = ref<Pick<ISpParticipant, "_id" | "name">[]>([]);
    const existingParticipantsIds = computed(() => spEvent.value.participants.map((p) => p._id));

    const getUsers = async (): Promise<ISpUser[]> => {
      const {
        data: { spUsersJson }
      }: { data: { spUsersJson: ISpUser[] } } = await apolloClient.query({
        query: USERS_QUERY
      });

      const users = spUsersJson.filter((u) => !existingParticipantsIds.value.includes(u._id));
      return users;
    };

    const users = await getUsers();
    const possibleParticipants = computed(() => users.filter((u) => !existingParticipantsIds.value.includes(u._id)));

    const addParticipants = () => {
      emit("addParticipants", participants.value);
      participants.value = [];
    };

    return { possibleParticipants, participants, addParticipants };
  }
});
</script>

<style scoped></style>