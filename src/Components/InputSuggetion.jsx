import { useState } from "react";
import axios from "axios";

const InputSuggestion = ({ closeModal, token }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Text-to-speech helper functions
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  // Function to post a suggestion
  const postSuggestion = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        by: 123, // Replace with the actual user ID from the session if available
        suggestion,
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array
      };

      console.log("Request Payload:", payload); // Debug: Log the payload

      const response = await axios.post(
        "https://dsb-yf9s.onrender.com/suggestion",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure the token is valid
          },
        }
      );

      console.log("Response Data:", response.data); // Debug: Log the response
      setSuccess("Suggestion posted successfully!");
      setSuggestion("");
      setTags("");
    } catch (err) {
      console.error(
        "Error Response:",
        err.response ? err.response.data : err.message
      ); // Log the full error

      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to post suggestion.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Component UI
  return (
    isOpen && (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[60%] lg:w-[80%] p-6">
            {/* Modal Header */}
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

            {/* Suggestion Input */}
            <textarea
              className="w-full h-40 mt-4 p-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your suggestion here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              onMouseEnter={() => speakText("Write your suggestion here")}
              onMouseLeave={stopSpeech}
            ></textarea>

            {/* Tags Input and Submit Button */}
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

            {/* Success and Error Messages */}
            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>
        </div>
      </>
    )
  );
};

export default InputSuggestion;
