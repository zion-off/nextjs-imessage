import { MessageType } from "@/types/message";

export type AppContextType = {
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
  menuVisible: number | null;
  setSelectedMessage: (id: number | null) => void;
  menuPosition: { x: number; y: number };
  setSelectedMenuPosition: (x: number, y: number) => void;
};
