import { useAppContext } from "@/context/context-provider";

export default function Menu() {
  const {
    userID,
    token,
    selectedMessage,
    menuPosition,
    deleteMessage,
    toggleEditing,
  } = useAppContext();

  async function handleDelete() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/messages/${selectedMessage}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userID,
            message_id: selectedMessage,
            token: token,
          }),
        }
      );
      if (selectedMessage) {
        deleteMessage(selectedMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ul
      className="absolute bg-windowBg/95 backdrop-blur-2xl shadow-md rounded-md p-1 text-xs font-regular divide-y divide-solid divide-fieldOutline px-2 cursor-pointer"
      style={{
        top: menuPosition.y,
        left: menuPosition.x,
      }}
    >
      <li className="p-1" onClick={handleDelete}>
        Undo send
      </li>
      <li className="p-1" onClick={toggleEditing}>
        Edit message
      </li>
    </ul>
  );
}
