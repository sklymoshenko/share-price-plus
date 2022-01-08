export interface ISpLoaner {
  id: ISpPersonConfig["id"];
  paid: ISpPersonConfig["paid"];
}

export interface ISpPersonConfig {
  name: string;
  paid: number;
  id: string;
  ows: number;
  exceed: number;
  loaners: ISpLoaner[];
}

export type Modes = "edit" | "new";
