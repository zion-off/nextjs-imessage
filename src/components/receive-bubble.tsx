export default function ReceiveBubble({
  user,
  message,
}: {
  user: string;
  message: string;
}) {
  return (
    <div className="w-full flex items-end gap-2">
      <div className="min-h-6 min-w-6 rounded-full bg-fieldOutline flex items-center justify-center">
        {user[0]}
      </div>
      <div className="flex flex-col gap-1">
        <p className="pl-3 text-fieldOutline text-xxs">{user}</p>
        <p className="min-h-5 flex items-center bg-receiveBubble py-1 px-3 rounded-xl mr-8 animate-appear">
          {message}
        </p>
      </div>
    </div>
  );
}
