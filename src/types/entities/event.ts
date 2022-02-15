import { ISpParticipant, ISpParticipantUpload } from "../spPeopleConfig";
import { ISpUser } from "./user";

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
  userName: ISpUser["name"];
  userId: ISpUser["_id"];
  change: {
    participants?: ISpParticipantUpload[];
    name?: string;
    isClosed?: boolean;
    closedAt?: string;
  };
}

export interface IEventPayedPayload {
  total: number;
  each: number;
  participants: {
    _id: ISpParticipant["_id"];
    ows: ISpParticipant["ows"];
    paid: ISpParticipant["paid"];
    name: ISpParticipant["name"];
  }[];
}
