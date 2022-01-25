import { ISpEvent } from "./types/entities/event";
import { ISpUser } from "./types/entities/user";

export const events: ISpEvent[] = [
  {
    _id: "eventId1",
    name: "Party",
    price: 3000,
    each: 1000,
    peopleCount: 3,
    isClosed: true,
    participants: [
      { _id: "userId1", paid: 1000, exceed: 0, ows: 0, name: "Chuck", loaners: [] },
      { _id: "userId2", paid: 1000, exceed: 0, ows: 0, name: "User1", loaners: [] },
      { _id: "userId3", paid: 1000, exceed: 0, ows: 0, name: "User1", loaners: [] }
    ],
    _createdAt: "30.12.2021",
    _closedAt: "01.01.2022"
  },
  {
    _id: "eventId2",
    name: "Amsterdam vacation Amsterdam vacation",
    price: 8000,
    each: 1600,
    peopleCount: 5,
    isClosed: true,
    participants: [
      { _id: "userId1", paid: 250, exceed: 0, ows: 1350, name: "Chuck", loaners: [] },
      { _id: "userId2", paid: 100, exceed: 0, ows: 1500, name: "User1", loaners: [] },
      { _id: "userId3", paid: 1650, exceed: 50, ows: 0, name: "User2", loaners: [] },
      { _id: "userId4", paid: 4000, exceed: 2400, ows: 0, name: "User3", loaners: [] },
      { _id: "userId5", paid: 2000, exceed: 400, ows: 0, name: "User4", loaners: [] }
    ],
    _createdAt: "30.12.2021"
  }
];

export const usersMock: ISpUser[] = [
  { _id: "userId1", name: "Chuck", email: "chuck.horny@seznam.cz" },
  { _id: "userId2", name: "User1", email: "user1.horny@seznam.cz" },
  { _id: "userId3", name: "User2", email: "user2.horny@seznam.cz" },
  { _id: "userId4", name: "User3", email: "user3.horny@seznam.cz" },
  { _id: "userId5", name: "User4", email: "user4.horny@seznam.cz" }
];
