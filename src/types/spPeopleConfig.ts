export interface ISpLoaner {
  _id: ISpParticipant["_id"];
  paid: ISpParticipant["paid"];
}

export interface ISpParticipant {
  _id: string;
  name: string;
  paid: number;
  ows: number;
  exceed: number;
  loaners: ISpLoaner[];
}

export type Modes = "edit" | "new";
