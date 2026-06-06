export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-slate-900">
      <div className="w-[60px] h-[60px] border-[5px] border-[rgba(255,247,247,0.916)] border-t-[#38803f] rounded-full animate-spin"></div>

      <p className="text-white text-lg font-medium tracking-wide">
        Loading...
      </p>
    </div>
  );
}