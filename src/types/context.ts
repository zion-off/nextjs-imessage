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
  deleteMessage: (messageID: number) => void;
  selectedMessage: number | null;
  setSelectedMessageID: (id: number | null) => void;
  menuPosition: { x: number; y: number };
  updateMenuPosition: (x: number, y: number) => void;
  editingMessage: boolean;
  toggleEditing: () => void;
};
