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
export interface ISpParticipantUpload {
  _id: string;
  name?: string;
  paid?: number;
}

export type Modes = "edit" | "new";
