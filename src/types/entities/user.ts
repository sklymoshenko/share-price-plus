export interface ISpUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  eventsCount?: number;
  events: string[];
  friends: string[];
}
