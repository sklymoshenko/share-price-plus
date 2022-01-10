export interface ISpLoaner {
  id: ISpPersonConfig["id"];
  paid: ISpPersonConfig["paid"];
}

export interface ISpPersonConfig {
  id?: string;
  name: string;
  paid: number;
  ows: number;
  exceed: number;
  loaners: ISpLoaner[];
}

export type Modes = "edit" | "new";
