export default function Badge({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 text-xs rr-text dark:bg-gray-800 h-8">
      {children}
    </span>
  );
}
