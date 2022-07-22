import { SearchProps } from './Search.types';
import React, { useState, SyntheticEvent } from 'react';
import mockedResponse from '../../mocks/searchResult.json';
import { ListEl } from '../List/List.types';
import Button from '../Button/Button';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ListEl[] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!i18n || !i18n.button || !i18n.label) {
    return null;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch(`${process.env.BE_BASE_URL}/todos/me/search/?${new URLSearchParams({ pattern: input })}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        return setResults(mockedResponse.artistsPerResource.fromLastfm); // TODO replace results with result
      })
      .catch(() => {
        // TODO handle me
      })
      .finally(() => {
        return setResults(mockedResponse.artistsPerResource.fromLastfm);
        // TODO handle disabled/loading state
      });
  };

  const handleFollow = (artistData: ListEl) => {
    setDisabled(true);

    fetch(`${process.env.BE_BASE_URL}/todos/me/follow`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(artistData),
    })
      .then(() => {
        console.log(`${artistData.name} successfully unfollowed`);
      })
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
      })
      .finally(() => {
        setTimeout(() => {
          setResults(null);
          setDisabled(false);
        }, 10000);
      });
  };

  return (
    <div className="relative flex lg:justify-center items-center mb-2 h-20 md:h-40 border-b-2 rr-border w-full">
      <form
        className="flex justify-between md:justify-between items-stretch h-10 w-full"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="mr-4 px-2 min-m-lg border-b-2 rr-border dark:bg-gh-darkly rr-text w-full md:w-2/3"
          type="text"
          name="search"
          placeholder={i18n.label}
          onChange={e => setInput(e.target.value)}
        />
        <Button i18n={i18n.button} className="btn-large" type="submit" disabled={disabled} loading={disabled} />
      </form>
      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 border-gh-dark top-16 md:top-32 w-full z-10">
          <ul>
            {results.map((result: ListEl, key: number) => (
              <li className="flex justify-between items-center py-2 rr-text border-b-2 border-gh-dark" key={key}>
                {result.name}
                <button
                  className="btn btn-small !border-gh-dark"
                  onClick={() => handleFollow(result)}
                  disabled={disabled}
                >
                  Follow
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
