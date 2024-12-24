"use client";

import { useAppContext } from "@/context/context-provider";
import Auth from "@/components/auth";
import Chat from "@/components/chat";

export default function Home() {
  let { token } = useAppContext();
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-clip">
      {token === "" ? <Auth /> : <Chat />}
    </div>
  );
}
