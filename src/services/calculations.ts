import { ISpPersonConfig } from "../types/spPeopleConfig";

export const calculateResults = (peopleConfig: ISpPersonConfig[], price: number) => {
  const totallPeopleCount: number = peopleConfig.length;
  const eachPays: number = Math.floor(price / totallPeopleCount);

  defineOwsAndExceeds(peopleConfig, eachPays);
  splitExceeds(peopleConfig);
};

function defineOwsAndExceeds(peopleConfig: ISpPersonConfig[], eachPays: number): void {
  for (const conf of peopleConfig) {
    const diff = conf.paid - eachPays;

    if (diff < 0) {
      conf.ows = Math.abs(diff);
    }

    if (diff > 0) {
      conf.exceed = diff;
    }
  }
}

function splitExceeds(peopleConfig: ISpPersonConfig[]): void {
  for (const conf of peopleConfig) {
    if (!conf.exceed) continue;
    // Looking for some1 who has money to pay
    const debtors = peopleConfig.filter((c) => c.ows);

    for (const debtor of debtors) {
      if (!conf.exceed) continue;
      // Checking how much debtor can pay
      const diff = conf.exceed - debtor.ows;
      if (diff > 0) {
        // When person exceeds more than one debtor pays
        if (!debtor.loaners.find((l) => l.id === conf.id)) {
          debtor.loaners.push({ id: conf.id, paid: debtor.ows });
        }

        // Debtor paied all of his debt
        debtor.ows = 0;

        // Exceeded amount after debt payment
        conf.exceed = diff;
        continue;
      } else {
        // Whem person exceeds same or less than one debtor pays
        if (!debtor.loaners.find((l) => l.id === conf.id)) {
          debtor.loaners.push({ id: conf.id, paid: conf.exceed });
        }

        // Debtors ows the rest of a debt
        debtor.ows = Math.abs(diff);

        // Person has no more exceeds
        conf.exceed = 0;
      }
    }
  }
}
