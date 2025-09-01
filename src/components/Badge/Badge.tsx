import clsx from 'clsx/lite';

export default function Badge({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span
      className={clsx(
        'inline-flex justify-between items-center rounded-full px-2.5 text-xs rr-text h-8 cursor-default min-w-22',
        className,
      )}
    >
      {children}
    </span>
  );
}
