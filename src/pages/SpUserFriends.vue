<template>
  <div class="q-pa-md row items-start">
    <div class="text-left">
      <div class="text-h6">Add User Friends</div>
      <div class="text-caption">List of people you can interract in events</div>
    </div>
    <div class="row items-center justify-between">
      <div class="col-8">
        <q-select
          v-model="friend"
          filled
          dense
          use-input
          input-debounce="500"
          hint="Friend name*"
          class="q-mt-md"
          option-label="name"
          :options="optionalFriends"
          @filter="filterFriends"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-3 q-mb-xs">
        <q-btn color="primary" icon="add" @click="addUserFriend" :disable="!friend?.length" />
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

// Services
import { apolloClient } from "@/services/apollo";
import { safeMethod } from "@/services/safeMethod";

// Types
import { ISpUser } from "@/types/entities/user";

// Components
import SpPersonItem from "@/components/SpPersonItem.vue";
import { getUsers } from "@/services/queries";

export default defineComponent({
  name: "SpUserFriends",
  components: { SpPersonItem },
  async setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.currentUser!);

    const friends = ref<ISpUser[]>([]);
    const getFriends = async () => {
      friends.value = await getUsers({ options: { idIn: currentUser.value.friends || [] } });
    };
    await safeMethod(getFriends);

    const friend = ref<ISpUser["name"]>("");
    const addUserFriend = async () => {
      if (friend.value === currentUser.value.name) {
        throw new Error("You are already friend to yourself!");
      }

      const existingFriendName = friends.value.find((f) => f.name === friend.value)?.name;

      if (!!existingFriendName) {
        throw new Error(`${existingFriendName} is already your friend`);
      }

      const result: { data?: { addFriend: ISpUser } | null | undefined } = await apolloClient.mutate({
        mutation: ADD_FRIEND_MUTATION,
        variables: {
          userId: currentUser.value?._id,
          name: friend.value
        }
      });

      if (result.data?.addFriend) {
        friends.value.push(result.data?.addFriend);
        friend.value = "";
      }
    };

    const optionalFriends = ref<ISpUser[]>([]);
    const filterFriends = async (val: string, update: Function, abort: Function) => {
      update(async () => {
        if (val === "") {
          optionalFriends.value = [];
        } else {
          const needle = val.toLowerCase();
          const users = await getUsers({ options: { name: needle } });
          optionalFriends.value = users.filter(
            (u) => ![currentUser.value._id, ...currentUser.value.friends].includes(u._id)
          );
        }
      });
    };

    return {
      friend,
      addUserFriend: () => safeMethod(addUserFriend),
      friends,
      currentUser,
      optionalFriends,
      filterFriends
    };
  }
});
</script>

<style scoped></style>
