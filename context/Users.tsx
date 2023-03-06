import { getUsers } from "@/lib/users";
import { User } from "@/types/backendTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext<{ users: User[] }>({
  users: [],
});

interface Props {
  children: ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers();
      if (res) setUsers(res);
    }
    fetchUsers();
  }, []);

  return (
    <Context.Provider value={{ users: users }}>{children}</Context.Provider>
  );
}

export function useUsersContext() {
  return useContext(Context);
}
