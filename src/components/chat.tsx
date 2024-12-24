"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/context-provider";
import ChatHeader from "./chat-header";
import SendBubble from "./send-bubble";
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
  } = useAppContext();
  const [message, setMessage] = useState("");

  function handlePostMessage() {
    try {
      fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          user_id: userID,
          token: token,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getMessages() {
    try {
      let res = await fetch(
        `http://localhost:8000/api/messages?skip=${messagesSet.size}`
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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let chat = document.querySelector(".grow");
      chat?.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
      getMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="md:w-2/3 w-9/12 h-2/3 bg-windowBg rounded-lg flex flex-col overflow-clip shadow-2xl text-xs backdrop-blur-lg">
        <ChatHeader />
        {/* messages */}
        <div className="grow flex flex-col px-4 gap-2 py-2">
          {messages.length > 0 &&
            messages.map((message: MessageType) => {
              if (message.user_id === Number(userID)) {
                return (
                  <SendBubble key={message.id} message={message.message} />
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
          className="h-8 m-4 outline-fieldOutline/20 outline-1 outline rounded-3xl px-4 py-2 focus:outline-fieldOutline/40 bg-windowBg resize-none"
          placeholder="iMessage"
        />
      </div>
    </>
  );
}
