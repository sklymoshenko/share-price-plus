export interface Loaner {
  id: Person["id"];
  paid: Person["paid"];
}

export interface Person {
  name: string;
  paid: number;
  id: number;
  ows: number;
  exceed: number;
  loaners: Loaner[];
}

export type Modes = "edit" | "new";
