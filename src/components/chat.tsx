"use client";

import { useAppContext } from "@/context/context-provider";
import ChatHeader from "./chat-header";
import SendBubble from "./send-bubble";
import ReceiveBubble from "./receive-bubble";

export default function Chat() {
  const { token } = useAppContext();
  const users = ["member_one", "member_two"];
  return (
    <>
      <div className="md:w-2/3 w-9/12 h-2/3 bg-windowBg rounded-lg flex flex-col overflow-clip shadow-2xl text-xs backdrop-blur-lg">
        <ChatHeader />
        {/* messages */}
        <div className="grow flex flex-col px-4 gap-2 py-2">
          {/* received */}
          <ReceiveBubble
            user="User"
            message="Lorem ipsum odor amet, consectetuer adipiscing elit. Proin metus
                      platea sem ornare varius dis suscipit. Faucibus vulputate a
                      viverra nibh consectetur habitasse. Velit ad quam ante morbi diam
                      magnis. Mauris tincidunt pellentesque parturient aenean potenti
                      maecenas."
          />
          {/* sent */}
          <SendBubble message="Lorem ipsum odor amet, consectetuer adipiscing elit. Proin metus platea sem ornare varius dis suscipit. Faucibus vulputate a viverra nibh consectetur habitasse. Velit ad quam ante morbi diam magnis. Mauris tincidunt pellentesque parturient aenean potenti maecenas." />
        </div>
        {/* input */}
        <textarea
          className="h-8 m-4 outline-fieldOutline/20 outline-1 outline rounded-3xl px-4 py-2 focus:outline-fieldOutline/40 bg-windowBg resize-none"
          placeholder="iMessage"
        ></textarea>
      </div>
    </>
  );
}
