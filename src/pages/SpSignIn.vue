<template>
  <div class="q-pa-md" style="height: 100%">
    <q-form @submit="onSubmit" class="q-gutter-md column justify-around" style="height: 100%">
      <div class="input-wrapper col-5">
        <div class="column justify-around" style="height: 100%">
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
      <div class="row justify-between col-1">
        <q-btn label="Sign Up" color="primary" to="/signup" />
        <q-btn label="Submit" type="submit" color="secondary" :loading="loading" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/store";
import gql from "graphql-tag";

// Types
import { ISpUser } from "@/types/entities/user";
import { useMutation } from "@vue/apollo-composable";
import { safeMethod } from "@/services/safeMethod";

const SIGN_IN_MUTATION = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      _id
      name
      events
      eventsCount
      email
      friends
    }
  }
`;

export default defineComponent({
  name: "SpSignIn",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    const isPwd = ref<boolean>(true);
    const user = ref<Pick<ISpUser, "email" | "password">>({
      email: "",
      password: ""
    });

    const { mutate: signIn, loading } = useMutation(SIGN_IN_MUTATION, { variables: user.value });

    const onSubmit = async () => {
      const {
        data: { login }
      } = (await signIn()) as { data: { login: ISpUser } };
      store.commit("setCurrentUser", login);
      router.push("/");
    };

    return { user, onSubmit: () => safeMethod(onSubmit), isPwd, loading };
  }
});
</script>

<style scoped></style>
