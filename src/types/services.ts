import { ISpUser } from "@/types/entities/user";
import { DocumentNode } from "@apollo/client";

export interface IUsersWhere {
  id?: string;
  idIn?: string[];
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetUsers {
  ids?: ISpUser["_id"][];
  query?: DocumentNode;
  options?: IUsersWhere;
}
