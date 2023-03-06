import { timeSince } from "@/utils/timeSince";
import { User } from "@/types/backendTypes";
import Avatar from "../Avatar";
import { conversations } from "@/lib/conversations";
import Link from "next/link";

interface Props {
  users: User[];
  activeUser?: User;
  minifyUserList: boolean;
}

export default function UsersList({
  users,
  activeUser,
  minifyUserList,
}: Props) {
  return (
    <ul role="list" className="overflow-y-scroll shadow">
      {users?.map((user) => {
        const lastMessage = conversations.getLastMessage(user.login.uuid);
        return (
          <Link
            href={`${window.location.origin}/chats/${user.login.uuid}`}
            key={user.login.uuid}
          >
            <li
              data-ui={activeUser?.login.uuid == user.login.uuid && "active"}
              className="relative flex max-w-full items-center px-4 py-7 shadow hover:cursor-pointer hover:bg-white hover:shadow hover:drop-shadow data-active:border-r-4 data-active:border-r-lavender-500 data-active:bg-white"
            >
              <div className="flex w-full gap-4">
                <Avatar src={user.picture.thumbnail} size="sm" />
                <div
                  className={[
                    "grid",
                    "grow",
                    "grid-cols-[minmax(0,_1fr)_max-content]",
                    minifyUserList ? "sm:hidden" : "",
                    "lg:grid",
                  ].join(" ")}
                >
                  <div className="self-center pr-2">
                    <p className="overflow-hidden text-ellipsis font-semibold text-slate-900">
                      {user.name.first} {user.name.last}
                    </p>
                    <p className="overflow-hidden overflow-hidden text-ellipsis whitespace-nowrap text-slate-500">
                      {lastMessage?.authorId == conversations.getMyId() &&
                        "You: "}{" "}
                      {lastMessage?.content}
                    </p>
                  </div>
                  {lastMessage && (
                    <div className="place-self-center">
                      <span className="whitespace-nowrap rounded-full bg-white py-1 px-2 text-xs font-semibold text-slate-400 sm:hidden">
                        {timeSince(lastMessage.timestamp)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
