export default function SendBubble({ message }: { message: string }) {
  return (
    <div className="w-full flex items-end gap-2 justify-end">
      <p className="min-h-5 flex items-center bg-sendBubble text-white py-1 px-3 rounded-xl ml-8">
        {message}
      </p>
    </div>
  );
}
