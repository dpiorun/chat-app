import { User } from "@/types/backendTypes";
import { getTime } from "@/utils/getTime";
import Camera from "../public/camera.svg";
import Dots from "../public/dots.svg";
import Phone from "../public/phone.svg";
import Star from "../public/star.svg";
import Smile from "../public/smile.svg";
import PaperPlane from "../public/paperPlane.svg";
import Avatar from "./Avatar";
import ArrowBack from "./ArrowBack";
import { Dispatch, FormEvent, useEffect, useRef, useState } from "react";
import { conversations } from "@/lib/conversations";
import Link from "next/link";
import { Action } from "./Layout";
import IntroBetaLogo from "../public/introBetaLogo.svg";

interface Props {
  user?: User;
  toggleShowUserDetails: () => void;
  dispatch: Dispatch<Action>;
}

export default function Chat({ user, toggleShowUserDetails, dispatch }: Props) {
  const [input, setInput] = useState<string>();
  const chatWindow = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const conversation = user
    ? conversations.getConversation(user?.login.uuid)
    : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const content = data.get("msg-content")?.toString().trim();
    if (!content || !user) return;
    conversations.addMessage(user.login.uuid, {
      authorId: conversations.getMyId(),
      content,
    });
    setInput("");
    if (!inputRef.current) return;
    inputRef.current.value = "";
    inputRef.current.focus();
    dispatch({
      type: "setActiveConversationLength",
      payload: { length: conversation?.messages.length ?? 0 },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code == "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  useEffect(() => {
    if (!chatWindow.current) return;
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
  }, [user?.login.uuid, input]);

  useEffect(() => {
    if (conversation && conversation?.numberOfUnreadMessages > 0) {
      conversations.markAsRead(conversation.id);
    }
  });

  return (
    <div className="grid h-screen grid-rows-[max-content_minmax(0,_1fr)_max-content] overflow-hidden">
      {user ? (
        <>
          <div className="grid grid-cols-[minmax(0,_1fr)_auto] content-center shadow md:shadow-none">
            <div className="flex md:shadow">
              <Link href="/" className="py-5 lg:hidden">
                <ArrowBack />
              </Link>
              <div className="flex items-center overflow-hidden py-5 pl-2 font-bold tracking-widest text-lavender-500 md:grow">
                <p
                  className="overflow-hidden text-ellipsis whitespace-nowrap font-bold uppercase tracking-widest text-lavender-500 hover:cursor-pointer"
                  onClick={toggleShowUserDetails}
                >
                  {user?.name.first} {user?.name.last}
                </p>
              </div>
            </div>
            <div className="flex items-center px-5 hover:cursor-pointer md:hidden">
              <Dots className="text-3xl" />
            </div>
            <div className="content-stretch hidden grid-cols-3 stroke-lavender-500 hover:cursor-pointer md:grid">
              <div className="flex h-full content-center items-center stroke-2 px-5 shadow hover:stroke-[3]">
                <Phone className="text-xl" />
              </div>
              <div className="flex h-full content-center items-center px-5 shadow hover:stroke-[3]">
                <Camera className="fill-lavender-500 text-2xl" />
              </div>
              <div className="flex h-full content-center items-center stroke-[1.5px] px-5 shadow hover:stroke-2">
                <Star className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="z-10 overflow-scroll shadow" ref={chatWindow}>
            <ul
              role="list"
              className="flex min-h-full flex-col-reverse whitespace-pre-wrap"
            >
              {conversation?.messages.map((msg, index) => (
                <li key={index} className="flex w-full gap-4 px-6 py-2">
                  {msg.authorId == user?.login.uuid ? (
                    <>
                      <Avatar src={user?.picture.thumbnail} size="sm" />
                      <div className="grow">
                        <div className="flex">
                          <div className="mt-4 inline-block w-3 overflow-hidden">
                            <div className="h-4 origin-top-right -rotate-45 transform bg-lightgray"></div>
                          </div>
                          <div className="rounded-lg bg-lightgray p-4">
                            {msg.content}
                          </div>
                        </div>
                        <div className="pl-6">
                          <p className="text-[0.7rem] text-slate-500">
                            {getTime(new Date(msg.timestamp))}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="grow">
                      <div className="flex flex-col items-end">
                        <div className="grid grid-cols-[minmax(0,_1fr)_max-content] pl-16">
                          <div className="rounded-lg bg-blue-100 p-4">
                            {msg.content}
                          </div>
                          <div className="mt-4 inline-block w-3 overflow-hidden">
                            <div className="h-4 origin-top-left rotate-45 transform bg-blue-100"></div>
                          </div>
                        </div>
                        <div className="pr-6">
                          <p className="text-[0.7rem] text-slate-500">
                            {getTime(new Date(msg.timestamp))}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full grid-cols-[max-content_minmax(0,_1fr)] place-content-center bg-white py-3 shadow ">
            <div className="flex items-center self-end px-6 pb-4">
              <button role="button">
                <Smile className="fill-slate-400 text-2xl" />
              </button>
            </div>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <div
                className='grid grow self-center after:invisible after:max-h-48 after:overflow-hidden after:whitespace-pre-wrap after:p-2 after:content-[attr(data-replicated-value)_"_"] after:[grid-area:_1_/_1_/_2_/_2]'
                data-replicated-value={input}
                onClick={() => inputRef.current?.focus()}
              >
                <textarea
                  ref={inputRef}
                  className="max-h-48 resize-none overflow-scroll whitespace-pre-wrap rounded-lg p-2 [grid-area:_1_/_1_/_2_/_2] focus:bg-blue-50 focus:outline-none"
                  onKeyDown={handleKeyDown}
                  onInput={(event) => setInput(event.currentTarget.value)}
                  placeholder="Type your message here..."
                  id="msg-content"
                  name="msg-content"
                  rows={1}
                />
              </div>
              <button
                ref={submitButtonRef}
                className="group mx-3 flex h-14 w-14 items-center justify-center self-end rounded-full bg-lavender-500 p-3"
                type="submit"
              >
                <PaperPlane className="rotate-12 fill-white stroke-white text-2xl group-hover:stroke-2" />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="grid h-[inherit] items-center justify-items-center">
          <IntroBetaLogo className="h-auto w-1/2" />
        </div>
      )}
    </div>
  );
}
