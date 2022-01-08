<template>
  <q-card flat bordered class="my-card text-left">
    <q-card-section class="text-body1">
      This app is suppose to help you to share your group expenses between each other.
    </q-card-section>

    <q-separator inset />

    <q-card-section class="text-body1" style="text-align: 'justify'">
      <div class="text-subtitle1">What you can do?</div>
      <q-list>
        <q-item v-ripple>
          <q-item-section>
            1. Create an Event to accumulate your expenses to a specific moment of your life
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section> 2. Use your own account to manage events </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <p>
              3. Caclulate price sharing for past events with <span class="text-weight-bold">'Simple'</span> claculation
            </p>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <p>4. Register with your friends and share expenses <span class="text-weight-bold">online</span></p>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="text-body2">
      <div class="text-subtitle2">How can you do it?</div>
      <q-list>
        <q-item v-ripple>
          <q-item-section>
            Use a big green button at the bottom-right corner to navigate and choose what do you want to do
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpHome",
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
