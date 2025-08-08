'use client';

const LastFmConnect = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Last.fm Connect</h1>
      <p className="text-gray-600 mb-6">
        Connect your Last.fm account to sync your listening history and discover new music.
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Connect to Last.fm</button>
    </div>
  );
};

export default LastFmConnect;
