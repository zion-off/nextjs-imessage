"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/context-provider";

export default function SendBubble({
  message,
  id,
}: {
  message: string;
  id: number;
}) {
  const [updatedMessage, setUpdatedMessage] = useState(message);
  const {
    token,
    userID,
    messages,
    updateMessages,
    selectedMessage,
    setSelectedMessageID,
    updateMenuPosition,
    editingMessage,
    toggleEditing,
  } = useAppContext();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.pageX;
    const y = e.pageY;
    setSelectedMessageID(id);
    updateMenuPosition(x, y);
  };

  async function handleEditMessage() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/messages/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userID,
            message_id: id,
            message: updatedMessage,
            token: token,
          }),
        }
      );
      if (res.ok) {
        const index = messages.findIndex((message) => message.id === id);
        if (index !== -1) {
          const newMessage = {
            id: messages[index].id,
            message: updatedMessage,
            username: messages[index].username,
            user_id: messages[index].user_id,
            created_at: messages[index].created_at,
          };
          const updatedMessages = [...messages];
          updatedMessages.splice(index, 1, newMessage);
          updateMessages(updatedMessages);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setUpdatedMessage(message);
  }, [editingMessage]);

  return (
    <div
      className="relative w-full flex items-end gap-2 justify-end"
      onContextMenu={handleContextMenu}
    >
      {editingMessage && selectedMessage === id ? (
        <input
          autoFocus
          value={updatedMessage}
          onChange={(e) => setUpdatedMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleEditMessage();
              toggleEditing();
            } else if (e.key === "Escape") {
              e.preventDefault();
              toggleEditing();
            }
          }}
          className="min-h-5 bg-sendBubble text-white py-1 px-3 rounded-xl ml-8 animate-scale-up focus:outline-none "
        />
      ) : (
        <p className="min-h-5 flex items-center bg-sendBubble text-white py-1 px-3 rounded-xl ml-8 animate-in">
          {message}
        </p>
      )}
    </div>
  );
}
