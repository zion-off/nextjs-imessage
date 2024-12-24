import { useAppContext } from "@/context/context-provider";

export default function ChatHeader() {
  const { users } = useAppContext();
  return (
    <>
      <div className="w-full h-14 bg-windowBar flex px-5 items-center gap-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-close" />
          <div className="w-2 h-2 rounded-full bg-minimize" />
          <div className="w-2 h-2 rounded-full bg-maximize" />
        </div>
        <p className="truncate">
          {users.map((user: string) => user).join(", ")}
        </p>
      </div>
    </>
  );
}
