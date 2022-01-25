import { ISpParticipant } from "../types/spPeopleConfig";

export const calculateResults = (participants: ISpParticipant[], price: number) => {
  const totallPeopleCount: number = participants.length;
  const eachPays: number = Math.floor(price / totallPeopleCount);

  defineOwsAndExceeds(participants, eachPays);
  splitExceeds(participants);
};

function defineOwsAndExceeds(participants: ISpParticipant[], eachPays: number): void {
  for (const participant of participants) {
    const diff = participant.paid - eachPays;

    if (diff < 0) {
      participant.ows = Math.abs(diff);
    }

    if (diff > 0) {
      participant.exceed = diff;
    }
  }
}

function splitExceeds(participants: ISpParticipant[]): void {
  for (const participant of participants) {
    if (!participant.exceed) continue;
    // Looking for some1 who has money to pay
    const debtors = participants.filter((c) => c.ows);

    for (const debtor of debtors) {
      if (!participant.exceed) continue;
      // Checking how much debtor can pay
      const diff = participant.exceed - debtor.ows;
      if (diff > 0) {
        // When person exceeds more than one debtor pays
        if (!debtor.loaners.find((l) => l._id === participant._id)) {
          debtor.loaners.push({ _id: participant._id, paid: debtor.ows });
        }

        // Debtor paied all of his debt
        debtor.ows = 0;

        // Exceeded amount after debt payment
        participant.exceed = diff;
        continue;
      } else {
        // Whem person exceeds same or less than one debtor pays
        if (!debtor.loaners.find((l) => l._id === participant._id)) {
          debtor.loaners.push({ _id: participant._id, paid: participant.exceed });
        }

        // Debtors ows the rest of a debt
        debtor.ows = Math.abs(diff);

        // Person has no more exceeds
        participant.exceed = 0;
      }
    }
  }
}
