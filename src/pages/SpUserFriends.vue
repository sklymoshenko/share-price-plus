<template>
  <div class="q-pa-md row items-start">
    <div class="text-left">
      <div class="text-h6">Add User Friends</div>
      <div class="text-caption">List of people you can interract in events</div>
    </div>
    <div class="row items-center justify-between">
      <div class="col-8">
        <q-input v-model="friend" filled dense clearable hint="Email" class="q-mt-md" />
      </div>
      <div class="col-3 q-mb-xs">
        <q-btn color="primary" icon="add" @click="addUserFriend" />
      </div>
    </div>
    <div class="persons q-mt-lg row justify-right" style="max-height: 220px">
      <SpPersonItem v-for="friend of friends" :key="friend._id" :name="friend.name" :deletable="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store/store";

// Gql
import { ADD_FRIEND_MUTATION } from "@/gql/mutations/addFriend";
import { USERS_QUERY } from "@/gql/queries/spUser";

// Services
import { apolloClient } from "@/services/apollo";
import { safeMethod } from "@/services/safeMethod";

// Types
import { ISpUser } from "@/types/entities/user";

// Components
import SpPersonItem from "@/components/SpPersonItem.vue";

export default defineComponent({
  name: "SpUserFriends",
  components: { SpPersonItem },
  async setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.currentUser!);

    const friend = ref<ISpUser["email"]>("");
    const getFriends = async () => {
      const {
        data: { spUsers }
      }: { data: { spUsers: ISpUser[] } } = await apolloClient.query({
        query: USERS_QUERY,
        variables: {
          idIn: currentUser.value.friends
        }
      });

      return spUsers;
    };

    const friends = ref(await getFriends());

    const addUserFriend = async () => {
      const result: { data?: { addFriend: ISpUser } | null | undefined } = await apolloClient.mutate({
        mutation: ADD_FRIEND_MUTATION,
        variables: {
          userId: currentUser.value?._id,
          email: friend.value
        }
      });

      if (result.data?.addFriend) {
        friends.value.push(result.data?.addFriend);
      }
    };

    return { friend, addUserFriend: () => safeMethod(addUserFriend), friends, currentUser };
  }
});
</script>

<style scoped></style>
