<template>
  <div class="q-mr-sm">
    <q-chip class="flex align-center">
      <q-avatar @click="$emit('click')">
        <img :src="avatar" />
      </q-avatar>
      <span>
        {{ name }} | <b v-if="paid">{{ paid }} </b>
      </span>
      <q-icon v-if="deletable" name="delete" color="red" class="q-ml-xs" @click="$emit('delete')" />
    </q-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import avatar from "../assets/avatar.png";

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
    return { avatar };
  }
});
</script>

<style scoped></style>
