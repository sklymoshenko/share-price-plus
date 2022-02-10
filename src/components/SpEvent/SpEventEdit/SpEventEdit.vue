<template>
  <SpEventEditMainInfo :totalPrice="total" :name="spEvent.name" :each="eachPayed" />
  <hr />
  <SpEventEditUser
    :currentUser="currentUser"
    :selfParticipant="selfParticipant"
    :each="eachPayed"
    @addAdditionalPayment="addAdditionalPayment"
  />
  <SpEventEditParticipants :participants="participantsInfo" :selfParticipant="selfParticipant" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watch } from "vue";

// Types
import { IEventPayedPayload, ISpEvent, ISpEventUpload } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { ISpParticipant } from "@/types/spPeopleConfig";

//Components
import SpEventEditMainInfo from "./SpEventEditMainInfo.vue";
import SpEventEditUser from "./SpEventEditUser.vue";
import SpEventEditParticipants from "./SpEventEditParticipants.vue";
import { useStore } from "@/store/store";

// lodash
// @ts-ignore
import cloneDeep from "lodash/cloneDeep";
import { useSubscription } from "@vue/apollo-composable";
import { EVENT_PAYED_SUBSCRIPTION } from "@/gql/subscriptions/eventPayed";

export default defineComponent({
  name: "SpEventEdit",
  components: { SpEventEditMainInfo, SpEventEditUser, SpEventEditParticipants },
  props: {
    spEvent: {
      type: Object as PropType<ISpEvent>,
      required: true
    },
    currentUser: {
      type: Object as PropType<ISpUser>,
      required: true
    }
  },
  setup(props) {
    const { spEvent, currentUser } = toRefs(props);
    const store = useStore();
    const total = ref<ISpEvent["price"]>(spEvent.value.price);
    const eachPayed = ref<ISpEvent["each"]>(spEvent.value.each);
    const participantsInfo = ref<IEventPayedPayload["participants"]>(
      spEvent.value.participants.map((p) => ({ _id: p._id, ows: p.ows, paid: p.paid, name: p.name }))
    );
    const selfParticipant = computed(() => participantsInfo.value.find((p) => p._id === currentUser.value._id)!);

    const addAdditionalPayment = async (paid: ISpParticipant["paid"]): Promise<void> => {
      const participants: ISpParticipant[] = cloneDeep(spEvent.value.participants);
      const participant = participants.find((p) => p._id === currentUser.value?._id)!;
      participant.paid += paid;

      const payload: { updateEventId: ISpEvent["_id"]; data: ISpEventUpload } = {
        updateEventId: spEvent.value._id,
        data: {
          participants: participants
        }
      };

      await store.dispatch("updateEvent", { data: payload, current: true });
    };

    const { result } = useSubscription(EVENT_PAYED_SUBSCRIPTION);

    watch(result, ({ eventPayed }: { eventPayed: IEventPayedPayload }) => {
      total.value = eventPayed.total;
      eachPayed.value = eventPayed.each;
      participantsInfo.value = eventPayed.participants;
    });

    return {
      addAdditionalPayment,
      selfParticipant,
      total,
      eachPayed,
      participantsInfo
    };
  }
});
</script>

<style scoped></style>
