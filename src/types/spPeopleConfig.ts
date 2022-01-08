export interface Loaner {
  id: PersonConfig["id"];
  paid: PersonConfig["paid"];
}

export interface PersonConfig {
  name: string;
  paid: number;
  id: number;
  ows: number;
  exceed: number;
  loaners: Loaner[];
}

export type Modes = "edit" | "new";
