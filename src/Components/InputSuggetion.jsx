import { useState } from "react";

const InputSuggestion = ({ closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-60%] lg:w-[80%] p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Enter Your Suggestion</h2>
              <p className="text-green-600 text-sm font-medium mt-2">
                4/5 credits left
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  closeModal();
                }}
                className="text-xl font-bold text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-40 mt-4 p-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your suggestion here..."
            ></textarea>

            {/* Tag Input and Button */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex-grow gap-2">
                <label className="text-sm text-gray-500">
                  Tag authority* <span className="text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="w-[20%] mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>

              <button className="w-full md:w-auto bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4 md:mt-0">
                Post suggestion
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default InputSuggestion;
