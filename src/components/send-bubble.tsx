import { useAppContext } from "@/context/context-provider";

export default function SendBubble({
  message,
  id,
}: {
  message: string;
  id: number;
}) {
  const { setSelectedMessage, setSelectedMenuPosition } = useAppContext();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.pageX;
    const y = e.pageY;
    setSelectedMessage(id);
    setSelectedMenuPosition(x, y);
  };

  return (
    <div
      className="relative w-full flex items-end gap-2 justify-end"
      onContextMenu={handleContextMenu}
    >
      <p className="min-h-5 flex items-center bg-sendBubble text-white py-1 px-3 rounded-xl ml-8 animate-in">
        {message}
      </p>
    </div>
  );
}
