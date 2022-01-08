<template>
  <div class="q-mr-sm">
    <q-chip class="flex align-center">
      <q-avatar @click="$emit('click')">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <span>
        {{ name }} | <b>{{ paid }} </b>
      </span>
      <q-icon v-if="deletable" name="delete" color="red" class="q-ml-xs" @click="$emit('delete')" />
    </q-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpPersonItem",
  emits: ["click", "delete"],
  props: {
    name: {
      type: String
    },
    paid: {
      type: Number
    },
    deletable: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
