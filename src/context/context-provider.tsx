"use client";

import { MessageType } from "@/types/message";
import { AppContextType } from "@/types/context";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");
  const updateToken = function (newToken: string) {
    setToken(newToken);
  };
  const [username, setUsername] = useState("");
  const updateUsername = function (newUsername: string) {
    setUsername(newUsername);
  };
  const [userID, setUserID] = useState("");
  const updateUserID = function (newID: string) {
    setUserID(newID);
  };
  const [loading, setLoading] = useState(false);
  const toggleLoading = function () {
    setLoading((prev) => !prev);
  };
  const [users, setUsers] = useState<string[]>(["Group chat"]);
  const updateUsers = function (newUsers: string[]) {
    setUsers(newUsers);
  };
  const [messages, setMessages] = useState<MessageType[]>([]);
  const updateMessages = function (newMessages: MessageType[]) {
    setMessages(newMessages);
  };
  const [messagesSet, setMessagesSet] = useState(new Set<number>());
  const updateMessagesSet = (newMessageID: number) => {
    setMessagesSet((prev) => new Set([...prev, newMessageID]));
  };
  const deleteMessage = (messageID: number) => {
    setMessagesSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(messageID);
      return newSet;
    });
    const index = messages.findIndex((message) => message.id === messageID);
    if (index !== -1) {
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
    }
    setMenuVisible(null);
  };

  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const setSelectedMessage = function (id: number | null) {
    setMenuVisible(id);
  };
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const setSelectedMenuPosition = function (x: number, y: number) {
    setMenuPosition({ x: x, y: y });
  };
  const value = {
    token,
    updateToken,
    username,
    updateUsername,
    userID,
    updateUserID,
    loading,
    toggleLoading,
    users,
    updateUsers,
    messages,
    updateMessages,
    messagesSet,
    updateMessagesSet,
    deleteMessage,
    menuVisible,
    setSelectedMessage,
    menuPosition,
    setSelectedMenuPosition,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context is undefined");
  }
  return context;
}
