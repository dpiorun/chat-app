import {
  Dispatch,
  FormEvent,
  ForwardedRef,
  forwardRef,
  RefObject,
  SetStateAction,
  useRef,
} from "react";

import PaperPlane from "../../public/paperPlane.svg";

interface Props {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSubmit: (content: string) => void;
}

const ChatInput = forwardRef(function ChatInput(
  { input, setInput, onSubmit }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const content = data.get("msg-content")?.toString().trim();
    if (!content) return;
    onSubmit(content);
  };

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code == "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  return (
    <form
      data-testid="form"
      className="flex items-center"
      onSubmit={handleSubmit}
    >
      <div
        className='grid grow self-center after:invisible after:max-h-48 after:overflow-hidden after:whitespace-pre-wrap after:p-2 after:content-[attr(data-replicated-value)_"_"] after:[grid-area:_1_/_1_/_2_/_2]'
        data-replicated-value={input}
      >
        <textarea
          role="input"
          ref={ref}
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
        data-testid="submit-button"
      >
        <PaperPlane className="rotate-12 fill-white stroke-white text-2xl group-hover:stroke-2" />
      </button>
    </form>
  );
});

export default ChatInput;
