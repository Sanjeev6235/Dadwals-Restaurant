export default function Loader({ full = false, text = 'Loading...' }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-[3px] border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (full) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">{spinner}</div>
  );

  return <div className="flex items-center justify-center py-16">{spinner}</div>;
}
