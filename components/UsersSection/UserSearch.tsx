import { Dispatch, SetStateAction } from "react";
import SearchIcon from "../../public/search.svg";
import { Action } from "../Layout";

interface Props {
  dispatch: Dispatch<Action>;
  minifyUserList: boolean;
}

export default function UserSearch({ dispatch, minifyUserList }: Props) {
  return (
    <div className="center px-auto w-full py-8 px-4 shadow">
      <form onSubmit={(event) => event.preventDefault()}>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <SearchIcon className="fill-slate-300" />
          </span>
          <input
            id="searchInput"
            type="text"
            name="search"
            className={[
              "block",
              "w-full",
              "rounded-full",
              "bg-white",
              "py-2",
              "pl-12",
              "pr-3",
              "placeholder:text-slate-300",
              "focus:border-lavender-500",
              "focus:outline-none",
              "focus:ring-1",
              "focus:ring-lavender-500",
              "sm:text-sm",
              minifyUserList ? "sm:pr-0" : "",
            ].join(" ")}
            placeholder="Search..."
            onChange={(event) =>
              dispatch({
                type: "setSearch",
                payload: { search: event.currentTarget.value },
              })
            }
            onFocus={() => dispatch({ type: "toggleActiveSearch" })}
            onBlur={() => dispatch({ type: "toggleActiveSearch" })}
          />
        </label>
      </form>
    </div>
  );
}
