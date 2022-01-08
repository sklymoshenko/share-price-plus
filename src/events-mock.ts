import { ISpEvent } from "./types/entities/event";

export const events: ISpEvent[] = [
  {
    id: "eventId1",
    name: "Party",
    price: 3000,
    each: 1000,
    peopleCount: 3,
    isClosed: true,
    participants: [
      { id: "userId1", paid: 1000, exceed: 0, ows: 0, name: "Chuck", loaners: [] },
      { id: "userId2", paid: 1000, exceed: 0, ows: 0, name: "User1", loaners: [] },
      { id: "userId3", paid: 1000, exceed: 0, ows: 0, name: "User1", loaners: [] }
    ],
    _createdAt: "30.12.2021",
    _closedAt: "01.01.2022"
  },
  {
    id: "eventId2",
    name: "Amsterdam vacation Amsterdam vacation",
    price: 8000,
    each: 1600,
    peopleCount: 5,
    isClosed: true,
    participants: [
      { id: "userId1", paid: 250, exceed: 0, ows: 1350, name: "Chuck", loaners: [] },
      { id: "userId2", paid: 100, exceed: 0, ows: 1500, name: "User1", loaners: [] },
      { id: "userId3", paid: 1650, exceed: 50, ows: 0, name: "User2", loaners: [] },
      { id: "userId4", paid: 4000, exceed: 2400, ows: 0, name: "User3", loaners: [] },
      { id: "userId5", paid: 2000, exceed: 400, ows: 0, name: "User4", loaners: [] }
    ],
    _createdAt: "30.12.2021"
  }
];
