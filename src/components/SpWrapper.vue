<template>
  <div class="row justify-center align-center">
    <div class="col-9" style="height: 90vh">
      <div class="column" style="height: inherit">
        <div class="q-mb-md">
          <slot name="header" />
        </div>
        <div class="col-8">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SpWrapper"
});
</script>
