import clsx from 'clsx/lite';

export default function Badge({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 text-xs rr-text h-8', className)}>
      {children}
    </span>
  );
}
