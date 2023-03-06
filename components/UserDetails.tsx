import { User } from "@/types/backendTypes";
import Avatar from "./Avatar";
import Facebook from "../public/facebook.svg";
import LinkedIn from "../public/linkedIn.svg";
import Twitter from "../public/twitter.svg";
import Information from "../public/information.svg";
import Copy from "../public/copy.svg";
import ArrowBack from "./ArrowBack";

interface Props {
  user?: User;
  toggleShowUserDetails: () => void;
}

export default function UserDetails({ user, toggleShowUserDetails }: Props) {
  if (!user) {
    return <></>;
  }
  return (
    <div className="grid min-h-screen grid-rows-[minmax(0,_1.33fr)_minmax(0,_1fr)_minmax(0,_1fr)]">
      <div className="flex h-full w-screen flex-col items-center px-5 py-12 shadow xl:w-full">
        <ArrowBack
          onClick={toggleShowUserDetails}
          className="absolute top-0 left-0 py-5 xl:hidden"
        />
        <Avatar src={user.picture.large} size="lg" />
        <p className="overflow-hidden text-ellipsis pt-6 pb-2 text-2xl font-bold tracking-wide text-lavender-500">
          {user.name.first} {user.name.last}
        </p>
        <p className="text-slate-400">
          {user.location.city}
          {", "}
          {user.location.country}
        </p>
        <div className="flex gap-3 pt-8 text-3xl">
          <Facebook />
          <LinkedIn />
          <Twitter />
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 px-14 py-12 shadow">
        <div className="flex items-center gap-3">
          <Information className="fill-lavender-500 text-2xl" />
          <p className="text-md uppercase tracking-wider text-slate-400">
            Information
          </p>
        </div>
        <div className="w-full text-slate-400">
          <div className="flex items-center justify-between border-b-2 py-3">
            <div className="font-semibold text-slate-500">{"Tel: "}</div>
            <div>{user.phone}</div>
          </div>
          <div className="flex items-center justify-between border-b-2 py-3">
            <div className="font-semibold text-slate-500">
              {"Date Of Birth: "}
            </div>
            <div className="text-end">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(new Date(user.dob.date))}
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="font-semibold text-slate-500">
              {"Nationality: "}
            </div>
            <div>{user.nat}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 px-10 py-12 shadow">
        <div className="flex items-center gap-2">
          <Copy className="stroke-3 rotate-180 fill-lavender-500 stroke-lavender-500 text-4xl" />
          <p className="text-md uppercase tracking-wider text-slate-400">
            Shared Files
          </p>
        </div>
        <ul
          role="list"
          className="list-disc leading-9 text-slate-400 underline underline-offset-4 marker:text-lavender-500"
        >
          <li className="hover:cursor-pointer hover:text-lavender-500">
            Annual Plan.doc
          </li>
          <li className="hover:cursor-pointer hover:text-lavender-500">
            Offers To Companies.pdf
          </li>
          <li className="hover:cursor-pointer hover:text-lavender-500">
            Calculation.xls
          </li>
        </ul>
      </div>
    </div>
  );
}
