import { USERS_QUERY } from "@/gql/queries/spUser";
import { ISpUser } from "@/types/entities/user";
import { IGetUsers } from "@/types/services";
import { apolloClient } from "./apollo";

export const getUsers = async (data?: IGetUsers): Promise<ISpUser[]> => {
  const { query = USERS_QUERY, options = {} } = data || {};
  const {
    data: { spUsers }
  }: { data: { spUsers: ISpUser[] } } = await apolloClient.query({
    query: query || USERS_QUERY,
    variables: options
  });

  return spUsers;
};
