import { useUsersContext } from "@/context/Users";
import { User } from "@/types/backendTypes";
import { Dispatch, useEffect, useState } from "react";
import { Action } from "../Layout";
import UserSearch from "./UserSearch";
import UsersList from "./UsersList";

interface Props {
  activeUser?: User;
  search: string;
  dispatch: Dispatch<Action>;
  minifyUserList: boolean;
}

export default function UsersSection({
  activeUser,
  search,
  dispatch,
  minifyUserList,
}: Props) {
  const { users } = useUsersContext();
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.first
            .concat(" ", user.name.last)
            .search(new RegExp(search, "i")) >= 0
      )
    );
  }, [search, users]);

  return (
    <div className="grid h-screen grid-rows-[max-content_minmax(0,_1fr)] bg-lightgray">
      <UserSearch dispatch={dispatch} minifyUserList={minifyUserList} />
      <UsersList
        users={filteredUsers}
        activeUser={activeUser}
        minifyUserList={minifyUserList}
      />
    </div>
  );
}
