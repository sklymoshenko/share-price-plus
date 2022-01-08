<template>
  <div class="results-preview">
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Preview</div>
        <div class="info flex justify-around">
          <div class="text-subtitle2">Totall: {{ price }}</div>
          <div class="text-subtitle2">Each: {{ Math.floor(price / peopleConfig.length) }}</div>
        </div>
      </q-card-section>

      <q-separator dark />

      <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="preview" node-key="label" default-expand-all text-color="white" />
      </div>
    </q-card>
    <div class="buttons flex justify-between" v-if="!hideButtons">
      <q-btn color="primary" label="Edit" @click="$emit('edit')" class="q-mt-md" />
      <q-btn color="secondary" label="New" @click="$emit('new')" class="q-mt-md" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

// Types
import { ISpPersonConfig } from "../types/spPeopleConfig";

export default defineComponent({
  name: "SpResultsPreview",
  emits: ["edit", "new"],
  props: {
    peopleConfig: {
      type: Array as PropType<ISpPersonConfig[]>,
      default: []
    },
    price: {
      type: Number,
      default: 0
    },
    hideButtons: {
      type: Boolean,
      default: true
    }
  },
  setup({ peopleConfig }) {
    const preview = computed(() => {
      return peopleConfig.map((conf) => {
        const returnsArray = conf.loaners
          .map((loaner) => {
            const name = peopleConfig.find((pc) => pc.id === loaner.id)?.name;
            if (!name) return;

            return { label: `Returns to ${name}: ${loaner.paid}` };
          })
          .filter(Boolean);

        return {
          label: conf.name,
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [{ label: `Paid: ${conf.paid}` }, ...returnsArray]
        };
      });
    });

    return { preview };
  }
});
</script>

<style scoped></style>
