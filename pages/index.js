import { useState, useEffect } from 'react';
import { addData, getAllData } from '../utils/indexedDBNative';

export default function Home() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getAllData();
    setData(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a valid name.');
      return;
    }
    setError('');
    await addData({ name: input });
    setInput('');
    fetchData();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">
          IndexedDB with Next.js
        </h1>
        <form className="flex gap-3 mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a name"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add
          </button>
        </form>
        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}
        <ul className="mt-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="border-b border-gray-200 py-2 text-gray-700 text-lg hover:bg-gray-50 transition duration-200"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
