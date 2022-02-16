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

export interface ISpEventCreate {
  participants?: ISpParticipantUpload[];
  name?: string;
  price?: number;
  each?: number;
  peopleCount?: number;
  isClosed?: boolean;
  createdAt?: string;
  closedAt?: string;
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

export interface ISpEventHistoryItemChangeParticipants {
  _id: string;
  name: ISpParticipant["name"];
  paid: ISpParticipant["paid"];
}

export interface ISpEventHistoryItemChange {
  _id: string;
  participants?: ISpEventHistoryItemChangeParticipants[];
  name?: ISpEvent["name"];
  isClosed?: ISpEvent["isClosed"];
  closedAt?: ISpEvent["closedAt"];
}
export interface ISpEventHistoryItem {
  _id: string;
  userId: string;
  userName: string;
  change: ISpEventHistoryItemChange;
  createdAt: string;
}
