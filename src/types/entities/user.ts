export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  eventsCount?: number;
  totallSpent?: number;
}
