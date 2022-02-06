import { ISpParticipant, ISpParticipantUpload } from "../spPeopleConfig";

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

export interface ISpEventUpload {
  participants: ISpParticipantUpload[];
  name?: string;
  price?: number;
  each?: number;
  peopleCount?: number;
  isClosed?: boolean;
  createdAt?: string;
  closedAt?: string;
}
