<template>
  <div class="q-pa-md" style="height: 100%">
    <q-form @submit="onSubmit" class="q-gutter-md column justify-around" style="height: 100%">
      <div class="input-wrapper col-5">
        <div class="column justify-around" style="height: 100%">
          <q-input
            filled
            v-model="user.name"
            hint="Name*"
            lazy-rules
            clearable
            :rules="[(val) => (val && val.length > 0) || 'Please write your name']"
          />

          <q-input
            filled
            v-model="user.email"
            hint="Email*"
            lazy-rules
            clearable
            :rules="[
              (val) => (val !== null && val !== '') || 'Please write your email',
              (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email type'
            ]"
          />
        </div>
      </div>
      <div class="row justify-between col-1">
        <q-btn label="Submit" type="submit" color="secondary" />
        <q-btn label="Sign Up" color="primary" to="/signup" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { ISpUser } from "@/types/entities/user";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SpSignIn",
  setup() {
    const router = useRouter();
    const user = ref<ISpUser>({
      name: "",
      email: "",
      password: ""
    });

    const onSubmit = () => {
      router.push("/");
    };

    return { user, onSubmit };
  }
});
</script>

<style scoped></style>
