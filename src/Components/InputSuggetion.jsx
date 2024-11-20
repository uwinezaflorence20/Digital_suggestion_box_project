import { useState } from "react";
import { Link } from "react-router-dom";

const InputSuggestion = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-white rounded-lg shadow-lg w-[80%] p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Enter Your Suggestion</h2>
            <p className="text-green-600 text-sm font-medium mt-2">4/5 credits left</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>

          <textarea
            className="w-full h-40 mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your suggestion here..."
          ></textarea>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex-grow">
              <label className="text-sm text-gray-500">
                Tag authority* <span className="text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                className="w-[30%] ml-8 mt-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>

            <Link to="/student">
              <button className="w-full sm:w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4 sm:mt-0">
                Post suggestion
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default InputSuggestion;
