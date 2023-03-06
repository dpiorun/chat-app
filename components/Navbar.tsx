import IconButton from "@/components/IconButton";
import Home from "../public/home.svg";
import Pencil from "../public/pencil.svg";
import User from "../public/user.svg";
import Chat from "../public/chat.svg";
import Copy from "../public/copy.svg";
import Settings from "../public/settings.svg";
import Icon from "./Icon";

export default function Navbar() {
  return (
    <div className="bg-lavender-700">
      <IconButton>
        <Icon Svg={Home} className="text-3xl" />
      </IconButton>
      <IconButton>
        <Icon Svg={Pencil} className="text-2xl" />
      </IconButton>
      <IconButton>
        <Icon Svg={User} className="text-2xl" />
      </IconButton>
      <IconButton data-ui="active">
        <Icon Svg={Chat} className="text-2xl" />
      </IconButton>
      <IconButton>
        <Icon Svg={Copy} className="rotate-180 text-4xl" />
      </IconButton>
      <IconButton>
        <Icon
          Svg={Settings}
          className="stroke-white stroke-1 text-2xl group-hover:stroke-[3] group-data-active:stroke-[3]"
        />
      </IconButton>
    </div>
  );
}
