import { ISpPersonConfig } from "../spPeopleConfig";

export interface ISpEvent {
  id?: string;
  name: string;
  price: number;
  each: number;
  peopleCount: number;
  participants: ISpPersonConfig[];
  isClosed: boolean;
  _createdAt?: string;
  _closedAt?: string;
}
