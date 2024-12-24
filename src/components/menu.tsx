import { useAppContext } from "@/context/context-provider";

export default function Menu() {
  const { menuVisible, menuPosition } = useAppContext();
  return (
    <ul
      className="absolute bg-windowBg/95 backdrop-blur-2xl shadow-md rounded-md p-1 text-xs font-regular divide-y divide-solid divide-fieldOutline px-2"
      style={{
        top: menuPosition.y,
        left: menuPosition.x,
      }}
    >
      <li className="p-1">Undo send</li>
      <li className="p-1">Edit message</li>
    </ul>
  );
}
