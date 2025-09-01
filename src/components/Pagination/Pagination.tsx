import clsx from 'clsx/lite';

export type TDirection = 'previous' | 'next';

const Pagination = ({
  handleClick,
  previousI18n,
  nextI18n,
  disablePrevious = false,
}: {
  handleClick: (page: TDirection) => void;
  previousI18n: string;
  nextI18n: string;
  disablePrevious?: boolean;
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handleClick('previous')}
        className={clsx('btn btn-large flex rounded-r-none border-r-0 w-24', disablePrevious && 'btn-disabled')}
        disabled={disablePrevious}
      >
        {previousI18n}
      </button>
      <button onClick={() => handleClick('next')} className={clsx('btn btn-large flex rounded-l-none w-24')}>
        {nextI18n}
      </button>
    </div>
  );
};

export default Pagination;
