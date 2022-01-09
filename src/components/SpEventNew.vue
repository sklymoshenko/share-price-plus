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
        :key="participant.id"
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

// Types
import { ISpEvent } from "@/types/entities/event";
import { ISpPersonConfig } from "@/types/spPeopleConfig";
import SpPersonItem from "./SpPersonItem.vue";

// Mock
import { usersMock } from "@/mock";

export default defineComponent({
  components: { SpPersonItem },
  setup() {
    const $q = useQuasar();
    const saveProgress = ref<boolean>(false);
    const route = useRouter();

    const spEvent = ref<ISpEvent>({
      name: "",
      id: "newEventId",
      each: 0,
      isClosed: false,
      participants: [],
      peopleCount: 0,
      price: 0
    });

    const getUsers = (): ISpEvent["participants"] => {
      return usersMock.map((u) => ({
        id: u.id,
        name: u.name,
        paid: 0,
        ows: 0,
        exceed: 0,
        loaners: []
      }));
    };

    // Load on created
    const participants: ISpEvent["participants"] = getUsers();

    const deleteParticipant = (participant: ISpPersonConfig) => {
      spEvent.value.participants = spEvent.value.participants.filter((p) => p.id !== participant.id);
    };

    const createEvent = (): void => {
      simulateLoading();
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
    return { spEvent, participants, deleteParticipant, createEvent, saveProgress };
  }
});
</script>

<style scoped></style>
