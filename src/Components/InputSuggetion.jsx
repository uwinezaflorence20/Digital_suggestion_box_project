import { useState } from "react";
import axios from "axios";

const InputSuggestion = ({ closeModal, token }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const postSuggestion = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://dsb-yf9s.onrender.com/suggestions",
        {
          by: 123, // Replace with actual user ID if available
          suggestion,
          tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Suggestion posted successfully!");
      setSuggestion("");
      setTags("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to post suggestion.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[60%] lg:w-[80%] p-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-lg font-semibold"
                onMouseEnter={() => speakText("Enter Your Suggestion")}
                onMouseLeave={stopSpeech}
              >
                Enter Your Suggestion
              </h2>
              <p className="text-green-600 text-sm font-medium mt-2">
                4/5 credits left
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  closeModal();
                }}
                className="text-xl font-bold text-gray-600 hover:text-gray-900"
                onMouseEnter={() => speakText("Close Modal")}
                onMouseLeave={stopSpeech}
              >
                &times;
              </button>
            </div>

            <textarea
              className="w-full h-40 mt-4 p-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your suggestion here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              onMouseEnter={() => speakText("Write your suggestion here")}
              onMouseLeave={stopSpeech}
            ></textarea>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex-grow gap-2">
                <label className="text-sm text-gray-500">
                  Tag authority* <span className="text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tags separated by commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  onMouseEnter={() => speakText("Tag authority input")}
                  onMouseLeave={stopSpeech}
                />
              </div>

              <button
                className="w-full md:w-auto bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4 md:mt-0"
                onClick={postSuggestion}
                disabled={loading}
                onMouseEnter={() => speakText("Post suggestion")}
                onMouseLeave={stopSpeech}
              >
                {loading ? "Posting..." : "Post suggestion"}
              </button>
            </div>

            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>
        </div>
      </>
    )
  );
};

export default InputSuggestion;
