import { ISpParticipant } from "../spPeopleConfig";

export interface ISpEvent {
  _id: string;
  name: string;
  price: number;
  each: number;
  peopleCount: number;
  participants: ISpParticipant[];
  isClosed: boolean;
  createdAt?: string;
  closedAt?: string;
}
