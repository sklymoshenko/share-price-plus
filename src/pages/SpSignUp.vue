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
            :rules="[
              (val) => (val !== null && val !== '') || 'Please write your password',
              (val) => val.length >= 4 || 'Password should be at least 4 characters'
            ]"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-2">
        <div class="row justify-between">
          <q-btn label="Back" color="primary" @click="router.back()" />
          <q-btn label="Submit" type="submit" :loading="loading" color="secondary" />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { ISpUser } from "@/types/entities/user";
import gql from "graphql-tag";

import { useMutation } from "@vue/apollo-composable";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "@/store/store";
import { safeMethod } from "@/services/safeMethod";

const SIGN_UP_MUTATION = gql`
  mutation register($password: String!, $email: String!, $name: String!) {
    register(password: $password, email: $email, name: $name) {
      _id
      name
      events
      email
      friends
    }
  }
`;

export default defineComponent({
  name: "SpSignUp",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();
    const user = ref<Pick<ISpUser, "name" | "email" | "password">>({
      name: "",
      email: "",
      password: ""
    });

    const isPwd = ref<boolean>(true);
    const { mutate: signUp, loading } = useMutation(SIGN_UP_MUTATION, { variables: user.value });

    const onSubmit = async () => {
      const {
        data: { register }
      } = (await signUp()) as { data: { register: ISpUser } };

      store.commit("setCurrentUser", register);
      router.push("/");
    };

    return { user, onSubmit: () => safeMethod(onSubmit), isPwd, router, loading };
  }
});
</script>

<style scoped></style>
