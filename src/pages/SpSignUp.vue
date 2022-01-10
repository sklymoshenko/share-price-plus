<template>
  <div class="q-pa-md" style="height: 100%">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md column justify-between"
      style="height: 100%"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <div class="input-wrapper col-8">
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

          <q-input
            filled
            v-model="user.password"
            hint="Password*"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            clearable
            :rules="[(val) => (val !== null && val !== '') || 'Please write your password']"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-2">
        <div class="row justify-between">
          <q-btn label="Submit" type="submit" color="secondary" />
          <q-btn label="Back" color="primary" @click="router.back()" />
        </div>
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
    const isPwd = ref<boolean>(true);

    const onSubmit = () => {
      router.push("/");
    };

    return { user, onSubmit, isPwd, router };
  }
});
</script>

<style scoped></style>
