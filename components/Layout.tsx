import { conversations } from "@/lib/conversations";
import { User } from "@/types/backendTypes";
import { useEffect, useReducer, useState } from "react";
import Chat from "./Chat/Chat";
import Navbar from "./Navbar";
import UserDetails from "./UserDetails";
import UsersSection from "./UsersSection/UsersSection";

interface LayoutState {
  search: string;
  isActiveSearch: boolean;
  activeConversationLength: number;
}

export type Action =
  | { type: "setSearch"; payload: { search: string } }
  | { type: "toggleActiveSearch"; payload?: {} }
  | { type: "setActiveConversationLength"; payload: { length: number } };

function reducer(state: LayoutState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "setSearch":
      return {
        ...state,
        search: payload.search,
      };
    case "toggleActiveSearch":
      return {
        ...state,
        isActiveSearch: !state.isActiveSearch,
      };
    case "setActiveConversationLength":
      return {
        ...state,
        activeConversationLength: payload.length,
      };
    default:
      return state;
  }
}

interface Props {
  activeUser?: User;
}

export default function Layout({ activeUser }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    search: "",
    isActiveSearch: false,
    activeConversationLength: 0,
  });
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);

  useEffect(() => {
    const pollingIntervalMS = 1000;
    const polling = setInterval(() => {
      const numberOfMsgs = conversations.getNumberOfUnreadMessages();
      if (numberOfUnreadMessages != numberOfMsgs) {
        setNumberOfUnreadMessages(numberOfMsgs);
      }
    }, pollingIntervalMS);

    return () => clearInterval(polling);
  }, [numberOfUnreadMessages]);

  const minifyUserList =
    !!activeUser && !showUserDetails && !state.isActiveSearch;

  return (
    <div
      className={[
        "grid",
        "grid-cols-1",
        minifyUserList ? "sm:grid-cols-[4.5rem_5rem_minmax(0,_1fr)]" : "",
        "lg:grid-cols-[4.5rem_35%_minmax(0,_1fr)]",
        activeUser
          ? "xl:grid-cols-[4.5rem_minmax(0,_3fr)_minmax(0,_6fr)_minmax(0,_3fr)]"
          : "xl:grid-cols-[4.5rem_minmax(0,_3fr)_minmax(0,_9fr)]",
      ].join(" ")}
    >
      <div
        data-ui={activeUser && !showUserDetails && "active"}
        className={
          "relative grid grid-cols-[4.5rem_minmax(0,_1fr)] items-stretch shadow data-active:hidden sm:col-span-2 sm:data-active:grid"
        }
      >
        <Navbar />
        <UsersSection
          activeUser={activeUser}
          search={state.search}
          dispatch={dispatch}
          minifyUserList={minifyUserList}
        />
      </div>
      <div
        data-ui={activeUser && !showUserDetails ? "active" : undefined}
        className="hidden data-active:block sm:data-active:grid lg:grid"
      >
        <Chat
          user={activeUser}
          toggleShowUserDetails={() => setShowUserDetails(!showUserDetails)}
          dispatch={dispatch}
        />
      </div>
      {activeUser && (
        <div
          data-ui={showUserDetails ? "active" : undefined}
          className="absolute inset-0 z-10 hidden h-screen overflow-y-scroll bg-white shadow data-active:block xl:relative xl:block"
        >
          <UserDetails
            user={activeUser}
            toggleShowUserDetails={() => setShowUserDetails(!showUserDetails)}
          />
        </div>
      )}
    </div>
  );
}
