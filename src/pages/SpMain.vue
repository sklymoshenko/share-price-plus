<template>
  <div class="column" style="height: inherit">
    <div class="col-2">
      <div class="row breadcrumbs justify-center" style="height: 100%" v-if="!isResultCalculated">
        <SpBreadCrumbs :items="breadcrumbs" @breadcrumb:clicked="moveTo($event)" />
      </div>
    </div>
    <div class="col-10">
      <div class="column justify-between" style="height: 100%" v-if="!isResultCalculated">
        <div class="col-8 steps-inners scroll-y">
          <SpTotallPrice v-if="currentStep === 0" v-model:price="price" />
          <SpPeopleCount v-if="currentStep === 1" v-model:people="people" />
          <SpPeopleConfig v-if="currentStep === 2" v-model:participants="participants" :people-count="people" />
        </div>
        <div class="col-3 control-btns">
          <div class="row justify-between">
            <q-btn color="primary" label="Back" @click="stepBackAction" :disable="currentStep === 0" />
            <q-btn color="secondary" :label="btnNextLabel" @click="stepAction" :disable="disableAction" />
          </div>
        </div>
      </div>
      <div class="column scroll-y" style="height: 100%" v-if="isResultCalculated">
        <SpResultsPreview
          :participants="participants"
          :price="price"
          @edit="editShare"
          @new="newShare"
          :hide-buttons="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

// Components
import SpBreadCrumbs from "@/components/SpBreadCrumbs.vue";
import SpTotallPrice from "@/components/SpTotallPrice.vue";
import SpPeopleCount from "@/components/SpPeopleCount.vue";
import SpPeopleConfig from "@/components/SpPeopleConfig.vue";
import SpResultsPreview from "@/components/SpResultsPreview.vue";

// Types
import { IBreadcrumb } from "../types/spBreadCrumbs";
import { ISpParticipant } from "../types/spPeopleConfig";

// Services
import { calculateResults } from "../services/calculations";

export default defineComponent({
  name: "SpMain",
  components: { SpBreadCrumbs, SpTotallPrice, SpPeopleCount, SpPeopleConfig, SpResultsPreview },
  setup() {
    const $q = useQuasar();
    const currentStep = ref<number>(0);
    const price = ref<number>(0);
    const people = ref<number>(3);
    const participants = ref<ISpParticipant[]>([]);
    const isResultCalculated = ref<boolean>(false);

    const btnNextLabel = computed(() => {
      return currentStep.value === 2 ? "Calculate" : "Next";
    });

    const disableAction = computed(() => {
      return price.value <= 0 || (currentStep.value === 2 && participants.value.length !== people.value);
    });

    const breadcrumbs = ref<IBreadcrumb[]>([
      {
        label: "Totall Price",
        disabled: false,
        href: "price",
        icon: "home",
        id: 0
      },
      {
        label: "People",
        disabled: true,
        href: "people",
        icon: "people",
        id: 1
      },
      {
        label: "Configuration",
        disabled: true,
        href: "configuration",
        icon: "assignment",
        id: 2
      },
      {
        disabled: true,
        href: "empty",
        id: 3
      }
    ]);

    const moveTo = (item: IBreadcrumb | { id: number }): void => {
      if (price.value <= 0) {
        $q.notify({
          message: "Price is still empty!",
          type: "negative"
        });
        return;
      }
      // Set active breadcrumb
      for (const breadcrumb of breadcrumbs.value) {
        breadcrumb.disabled = true;

        if (breadcrumb.id === item.id) {
          breadcrumb.disabled = false;

          // Set new current step
          currentStep.value = item.id;
        }
      }
    };

    const paidPriceValidate = () => {
      const allPaied = participants.value.reduce((prev, curr) => prev + curr.paid, 0);
      if (allPaied !== price.value) {
        const diff = Math.abs(allPaied - price.value);
        let message = `Totall paid is short for ${diff}. Someone is cheating`;
        if (allPaied > price.value) {
          message = `Totall paid is more then totall price. Spend ${diff} more shakels`;
        }

        $q.notify({
          message,
          type: "negative"
        });
        return false;
      }

      return true;
    };

    const stepAction = () => {
      if (currentStep.value < 2) {
        currentStep.value++;
        moveTo({ id: currentStep.value++ });
        return;
      }

      const validPrices = paidPriceValidate();
      if (!validPrices) return;

      calculateResults(participants.value, price.value);
      isResultCalculated.value = true;
    };

    const stepBackAction = () => {
      currentStep.value--;
      moveTo({ id: currentStep.value });
    };

    const newShare = (): void => {
      isResultCalculated.value = false;
      participants.value = [];
      price.value = 0;
      currentStep.value = 0;
      people.value = 3;
    };

    const editShare = (): void => {
      participants.value = participants.value.map((conf) => ({ ...conf, loaners: [] }));
      isResultCalculated.value = false;
    };

    return {
      currentStep,
      price,
      people,
      breadcrumbs,
      moveTo,
      btnNextLabel,
      stepAction,
      stepBackAction,
      participants,
      isResultCalculated,
      disableAction,
      newShare,
      editShare
    };
  }
});
</script>

<style></style>
