"use client";

import { MessageType } from "@/types/message";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  token: string;
  updateToken: (newToken: string) => void;
  username: string;
  updateUsername: (newUsername: string) => void;
  userID: string;
  updateUserID: (newID: string) => void;
  loading: boolean;
  toggleLoading: () => void;
  users: string[];
  updateUsers: (newUsers: string[]) => void;
  messages: MessageType[];
  updateMessages: (newMessages: MessageType[]) => void;
  messagesSet: Set<number>;
  updateMessagesSet: (newMessageID: number) => void;
}

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
  const updateMessagesSet = function (newMessageID: number) {
    setMessagesSet((prev) => new Set(prev.add(newMessageID)));
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
