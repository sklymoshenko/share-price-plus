<template>
  <div class="share-price-breadcrumbs">
    <div class="row justify-center">
      <div class="col-12">
        <q-breadcrumbs active-color="secondary" align="center" gutter="sm" separator="|">
          <q-breadcrumbs-el
            v-for="item in items"
            :key="item.id"
            :icon="item.icon"
            :label="item.label"
            :disable="item.disabled"
            class="cursor-pointer"
            @click="$emit('breadcrumb:clicked', item)"
          />
        </q-breadcrumbs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "../types/spBreadCrumbs";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SpBreadCrumbs",
  emits: ["breadcrumb:clicked"],
  props: {
    items: {
      required: true,
      type: Array as PropType<Item[]>
    }
  }
});
</script>

<style scoped></style>
