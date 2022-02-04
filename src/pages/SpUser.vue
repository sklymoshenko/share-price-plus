<template>
  <div class="q-pa-md row items-start">
    <div>
      <div class="text-h6">User info</div>
    </div>
    <q-card flat bordered class="my-card full-width">
      <q-card-section>
        <q-input v-model="person.name" filled clearable dense :hint="'Name'" :disable="!isEditMode" />
        <q-input v-model="person.email" filled dense clearable :hint="'Email'" class="q-mt-md" :disable="!isEditMode" />
      </q-card-section>

      <q-separator />

      <q-card-section class="column items-start">
        <div class="text-subtitle1">Totall events: {{ person.eventsCount }}</div>
        <div class="text-subtitle1">Totall spent: {{ person.totallSpent }}</div>
      </q-card-section>

      <q-card-section class="row justify-between">
        <q-btn color="primary" :label="editBtnLabel" @click="isEditMode = !isEditMode" />
        <q-btn v-if="isEditMode" color="secondary" label="Save" @click="saveUserInfo" :loading="saveProgress" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store/store";
import { ISpUser } from "@/types/entities/user";
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "SpUser",
  setup() {
    const store = useStore();
    const person: ISpUser | null = store.state.currentUser;
    const isEditMode = ref<boolean>(false);
    const $q = useQuasar();
    const saveProgress = ref<boolean>(false);

    const editBtnLabel = computed((): string => {
      return isEditMode.value ? "Cancel" : "Edit";
    });

    const saveUserInfo = (): void => {
      simulateLoading();
    };

    const simulateLoading = (): void => {
      saveProgress.value = true;

      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        saveProgress.value = false;
        isEditMode.value = false;
        $q.notify({
          message: "Saved!",
          type: "positive"
        });
      }, 3000);
    };

    return { person, isEditMode, saveUserInfo, saveProgress, editBtnLabel };
  }
});
</script>

<style scoped></style>
