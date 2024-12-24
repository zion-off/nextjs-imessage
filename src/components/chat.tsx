"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/context-provider";
import ChatHeader from "./chat-header";
import SendBubble from "./send-bubble";
import Menu from "./menu";
import ReceiveBubble from "./receive-bubble";
import { MessageType } from "@/types/message";

export default function Chat() {
  const {
    userID,
    token,
    messages,
    updateMessages,
    messagesSet,
    updateMessagesSet,
    menuVisible,
    setSelectedMessage,
  } = useAppContext();
  const [message, setMessage] = useState("");

  async function handlePostMessage() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            user_id: userID,
            token: token,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getMessages = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/messages?skip=${messagesSet.size}`
      );
      let data = await res.json();
      if (data.length > 0) {
        let newMessages = data
          .filter((message: MessageType) => !messagesSet.has(message.id))
          .map((message: MessageType) => {
            updateMessagesSet(message.id);
            return message;
          });
        updateMessages([...messages, ...newMessages]);
      }
      let chat = document.querySelector(".grow");
      chat?.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getMessages, 2000);
    return () => clearInterval(interval);
  }, [messages, messagesSet, updateMessages, updateMessagesSet]);

  return (
    <>
      <div
        className="md:w-2/3 w-9/12 h-2/3 bg-windowBg rounded-lg flex flex-col overflow-clip shadow-2xl text-xs backdrop-blur-lg"
        onClick={() => setSelectedMessage(null)}
      >
        <div className="flex-none">
          <ChatHeader />
        </div>
        {/* messages */}
        <div className="grow overflow-y-scroll flex flex-col px-4 gap-2 py-2">
          {messages.length > 0 &&
            messages.map((message: MessageType) => {
              if (message.user_id === Number(userID)) {
                return (
                  <SendBubble
                    key={message.id}
                    message={message.message}
                    id={message.id}
                  />
                );
              } else {
                return (
                  <ReceiveBubble
                    key={message.id}
                    user={message.username}
                    message={message.message}
                  />
                );
              }
            })}
        </div>
        {/* input */}
        <div className="flex-none p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handlePostMessage();
                setMessage("");
              }
            }}
            className="w-full h-8 outline-fieldOutline/20 outline-1 outline rounded-3xl px-4 py-2 focus:outline-fieldOutline/40 bg-windowBg resize-none"
            placeholder="iMessage"
          />
        </div>
      </div>
      {menuVisible && <Menu />}
    </>
  );
}
